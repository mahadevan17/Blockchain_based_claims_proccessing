// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Registration {
    // Variables
    address public regulatory_authority;
    mapping(address => bool) public patients;
    mapping(address => bool) public insuranceCompanies;
    mapping(address => bool) public physicians;
    mapping(address => bool) public pharmacies;

    constructor() {
        regulatory_authority = msg.sender;
    }

    // Modifiers
    modifier OnlyRegulatoryAuthority() {
        require(msg.sender == regulatory_authority, "Only regulatory authority can register");
        _;
    }
    // Events
    event PhysicianRegistered(address indexed physician);
    event InsuranceCompanyRegistered(address indexed insuranceCompany);
    event PharmacyRegistered(address indexed pharmacy);
    event PatientRegistered(address indexed patient);

    // Functions
    function PhysicianRegistration(address _Physician) external OnlyRegulatoryAuthority {
        require(!physicians[_Physician], "Physician already registered");
        physicians[_Physician] = true;
        emit PhysicianRegistered(_Physician);
    }

    function InsuranceCompanyRegistration(address _insuranceCompany) external OnlyRegulatoryAuthority {
        require(!insuranceCompanies[_insuranceCompany], "Insurance company already registered");
        insuranceCompanies[_insuranceCompany] = true;
        emit InsuranceCompanyRegistered(_insuranceCompany);
    }

    function PharmacyRegistration(address _pharmacy) external OnlyRegulatoryAuthority {
        require(!pharmacies[_pharmacy], "Pharmacy already registered");
        pharmacies[_pharmacy] = true;
        emit PharmacyRegistered(_pharmacy);
    }

    function PatientRegistration(address _patient) external OnlyRegulatoryAuthority {
        require(!patients[_patient], "Patient already registered");
        patients[_patient] = true;
        emit PatientRegistered(_patient);
    }
}

contract Approval {
    Registration reg;

    struct PharmacySelect {
        address registeredPharmacy;
        bool isSelected;
    }

    mapping(address => PharmacySelect[]) public PharmaciesSelection;
    mapping(address => uint) public selectionCounter;

    bytes32 public IPFShash;

    enum ApprovalRequestState { Pending, Approved }
    ApprovalRequestState public ApprovalState;

    enum InsuranceApprovalState { Pending, Approved, Rejected }
    InsuranceApprovalState public InsuranceApprovalstate;

    enum MedicineCollectionState { ReadyForCollection, Collected }
    MedicineCollectionState public MedicineCollectionstate;

    enum PaymentState { Pending, Paid }
    PaymentState public Paymentstate;

    uint public Patient_ID;
    uint public Drug1CRN;
    uint public Drug2CRN;
    uint public Drug3CRN;
    uint public MedicationInvoice_ID;
    uint public DrugTotalCost;
    uint public PaidAmount;

    // Constructor
    constructor(address _reg_contract_address) {
        reg = Registration(_reg_contract_address);
    }

    // Modifiers
    modifier OnlyPhysician() {
        require(reg.physicians(msg.sender), "Only Physician can create Prescription");
        _;
    }

    modifier OnlyPatient() {
        require(reg.patients(msg.sender), "Only Patient is allowed to select pharmacies");
        _;
    }

    modifier OnlyPharmacy() {
        require(reg.pharmacies(msg.sender), "Only registered pharmacy is allowed");
        _;
    }

    modifier OnlyInsuranceCompany() {
        require(reg.insuranceCompanies(msg.sender), "Only Insurance company can call this function");
        _;
    }

    // Events
    event PrescriptionCreated(address indexed Physician, uint PatientID, bytes32 _IPFShash);

    event PharmacyApprovalStateChanged(address indexed pharmacy, uint status);
    
    event PharmacySelected(address indexed patient, uint selectionCount);
    event RequestInsuranceApprovalStateChanged(address _pharmacy, uint PatientID);
    event RequestApproval(address Insurance_Company , uint insuranceApprovalstatus,  uint PatientID, address _Pharmacyaddress);
    event RequestRejection (address Insurance_Company , uint insuranceApprovalstatus,  uint PatientID, address _Pharmacyaddress);
    event medicationisprepread (address _pharmacy, uint PatientID);
    event medicationcollected (address Patient, uint PatientID, bytes32 _IPFShash );
    event PaymentRequested (address _pharmacy, uint medicationinvoiceID);
    event ClaimPaid (address Insurance_Company, uint medicationinvoiceID);

    // Prescription creation (Physician only)
    function PrescriptionCreation(uint Patient_Id, uint Drug1CRN_, uint Drug2CRN_, uint Drug3CRN_, string memory IPFShash_) external OnlyPhysician {
        Patient_ID = Patient_Id;
        Drug1CRN = Drug1CRN_;
        Drug2CRN = Drug2CRN_;
        Drug3CRN = Drug3CRN_;
        IPFShash = bytes32(bytes(IPFShash_));

        emit PrescriptionCreated(msg.sender, Patient_ID, IPFShash);
    }

    // Patient selects a pharmacy (Patient only)
    function Pharmacies_Selection(address Pharmacy_) external OnlyPatient {
        require(selectionCounter[msg.sender] < 5, "You cannot select more than 5 Pharmacies");
        require(reg.pharmacies(Pharmacy_), "Only registered Pharmacies can be selected");

        PharmaciesSelection[msg.sender].push(PharmacySelect(Pharmacy_, true));
        selectionCounter[msg.sender]++;
        ApprovalState = ApprovalRequestState.Pending;
        emit PharmacySelected(msg.sender, selectionCounter[msg.sender]);
    }

    // Pharmacy Approval (Pharmacy only)
    function PharmacyApproval(address Patient_) external OnlyPharmacy {
        require(ApprovalState == ApprovalRequestState.Pending, "Request is already processed");

        for (uint i = 0; i < selectionCounter[Patient_]; i++) {
            if (PharmaciesSelection[Patient_][i].registeredPharmacy == msg.sender &&
                PharmaciesSelection[Patient_][i].isSelected) {
                ApprovalState = ApprovalRequestState.Approved;
                emit PharmacyApprovalStateChanged(msg.sender, 1);
                return;
            }
        }
        emit PharmacyApprovalStateChanged(msg.sender, 0);
    }

    // Request Insurance Approval (Pharmacy only)
    function RequestInsuranceApproval(uint Patient_, uint Drug1CRN_, uint Drug2CRN_, uint Drug3CRN_) external OnlyPharmacy {
        require(ApprovalState == ApprovalRequestState.Approved, "Pharmacy approval required");

        Patient_ID = Patient_;
        Drug1CRN = Drug1CRN_;
        Drug2CRN = Drug2CRN_;
        Drug3CRN = Drug3CRN_;
        InsuranceApprovalstate = InsuranceApprovalState.Pending;
        emit RequestInsuranceApprovalStateChanged(msg.sender, Patient_ID);
    }

    // Insurance Approval (Insurance Company only)
    function InsuranceApproval(InsuranceApprovalState _insApproval, address _Pharmacy, uint patient_) external OnlyInsuranceCompany {
        require(reg.pharmacies(_Pharmacy), "Pharmacy not registered");
        require(InsuranceApprovalstate == InsuranceApprovalState.Pending, "Request already processed");

        Patient_ID = patient_;
        if (_insApproval == InsuranceApprovalState.Approved){
            InsuranceApprovalstate = InsuranceApprovalState.Approved;
            emit RequestApproval(msg.sender, 1 ,Patient_ID, address(_Pharmacy) );
        }

        if (_insApproval == InsuranceApprovalState.Rejected){
            InsuranceApprovalstate = InsuranceApprovalState.Rejected;
            emit RequestRejection(msg.sender, 2 , Patient_ID, address(_Pharmacy));
        }

    }

    // Medication Preparation (Pharmacy only)
    function MedicationPreparation(uint patient_) external OnlyPharmacy {
        require(InsuranceApprovalstate == InsuranceApprovalState.Approved, "Claim is rejected");
        Patient_ID = patient_;
        MedicineCollectionstate = MedicineCollectionState.ReadyForCollection;
        emit medicationisprepread (msg.sender, Patient_ID);
    }

    // Medication Collection (Patient only)
    function MedicationCollection(uint patient_) external OnlyPatient {
        require(MedicineCollectionstate == MedicineCollectionState.ReadyForCollection, "Not ready, try again later");
        Patient_ID = patient_;
        MedicineCollectionstate = MedicineCollectionState.Collected;
        emit medicationcollected (msg.sender, Patient_ID, bytes32(IPFShash));
    }

    // Payment Request (Pharmacy only)
    function PaymentRequest(uint MedicationInvoiceId_, uint Drugtotalcost) external OnlyPharmacy {
        require(MedicineCollectionstate == MedicineCollectionState.Collected, "Wait till medicine is collected");
        MedicationInvoice_ID = MedicationInvoiceId_;
        DrugTotalCost = Drugtotalcost;
        Paymentstate = PaymentState.Pending;
        emit PaymentRequested (msg.sender, MedicationInvoice_ID);
    }

    // Claim Payment (Insurance Company only)
    function ClaimPayment(uint _medicationinvoiceID) external OnlyInsuranceCompany payable {
        require(Paymentstate == PaymentState.Pending, "Can't claim payment");
        require(msg.value == DrugTotalCost, "Paid amount does not match the claim");
        MedicationInvoice_ID = _medicationinvoiceID;
        Paymentstate = PaymentState.Paid;
        emit ClaimPaid (msg.sender, MedicationInvoice_ID);
    }
}
