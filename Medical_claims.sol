// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;


contract Registration{
    //the variables
    address public regulatory_authority;

    mapping(address=>bool) public patients;
    mapping(address=>bool) public insuranceCompanies;
    mapping(address=>bool) public physicians;
    mapping(address=>bool) public pharmacies;

    constructor(){
        regulatory_authority = msg.sender;
    }

    //modifiers
    modifier OnlyRegulatoryAuthority(){
        require(msg.sender==regulatory_authority,"Only regulatory authority can register");
        _;
    }


    //events
    event PhysicianRegistered(address indexed physician);
    event InsuranceCompanyRegistered(address indexed insuranceCompany);
    event PharmacyRegistered(address indexed pharmacy);
    event PatientRegistered(address indexed patient);

    //The functions

    //PhysicianRegistration : to register physician using there address
    function PhysicianRegistration(address _Physician) OnlyRegulatoryAuthority external {
        require(!physicians[_Physician], "Physician already registered");
        physicians[_Physician] = true;
        emit InsuranceCompanyRegistered(address(_Physician));
    }

    //InsuaranceCompanyRegistration : to register Insurance Comany using it's address
    function InsuranceCompanyRegistration(address _insuranceCompany) OnlyRegulatoryAuthority external {
        require(!insuranceCompanies[_insuranceCompany], "Insurance company already registered");
        insuranceCompanies[_insuranceCompany] = true;
        emit InsuranceCompanyRegistered(address(_insuranceCompany));
    }
    
    //PharmacyRegistration: to register pharmacy using it's addresss
    function PharmacyRegistration(address _pharmacy) OnlyRegulatoryAuthority external{
        require(!pharmacies[_pharmacy], "Pharmacy already registered");
        pharmacies[_pharmacy] = true;
        emit PharmacyRegistered(address(_pharmacy));
    }

    //patientRegistration: to register patient using their Address
    function PatientRegister(address _patient) OnlyRegulatoryAuthority external{
        require(!patients[_patient], "Patient already registered");
        patients[_patient] = true;
        emit PatientRegistered(address(_patient));
    }
}


contract Approval{

    //the variables

    Registration reg;

    struct PharmacySelect{             //Used to store and map patients to the Pharmacies they select
        address registeredPharmacy;
        bool isSelected;
    }

    mapping(address => PharmacySelect[]) public PharmaciesSelection; //Links Pharmacys to the patients that selected them
    mapping(address=>uint) selectionCounter;

    bytes32 IPFShash;
    enum ApprovalRequestState{Pending,Approved}  
    ApprovalRequestState public ApprovalState;
    enum InsuranceApprovalState{Pending,Approved,Rejected}
    InsuranceApprovalState public InsuranceApprovalstate;
    enum MedicineCollectionState{ReadyForCollection,Collected}
    MedicineCollectionState public MedicineCollectionstate;
    enum PaymentState{pending,paid}
    PaymentState public Paymentstate;

    uint Patient_ID;
    uint Drug1CRN;
    uint Drug2CRN;
    uint Drug3CRN;
    uint MedicationInvoice_ID;
    uint DrugTotalCost;
    uint PaidAmount;

    //constructor

    constructor(address _reg_contract_address) {
        reg = Registration(_reg_contract_address);
    }

    //modifiers
    modifier OnlyPhysician(){
        require(reg.physicians(msg.sender),"Only Physician can create Prescription");
        _;
    }

    modifier OnlyPatient(){
        require(reg.patients(msg.sender),"Only Patient is allwoed to select pharmacies");
        _;
    }

    modifier OnlyPharmacy(){
        require(reg.pharmacies(msg.sender),"Only registered pharmacies is allowed");
        _;
    }

    modifier OnlyInsuranceCompany(){
        require(reg.insuranceCompanies(msg.sender),"Only Insurance company can call this function");
        _;
    }

    //events

    event PresciptionCreated(address indexed Physician, uint PatientID,bytes32 _IPFShash );
    event PharmacyApprovalStateChanged();
    event PharmacySelected(address indexed,uint);
    event RequestInsuranceApprovalStateChanged();
    event InsuranceApprovalStateChanged();
    event MedicationPreperationStateChanged();
    event MedicationCollected();
    event PaymentRequested();
    event PaymentClaimed();

    //functions to implement

    //PrescriptionCreation functiona can be run by registered physician only
    function PresciptionCreation(uint Patient_Id,uint Drug1CRN_,uint Drug2CRN_,uint Drug3CRN_ ,string memory IPFShash_) OnlyPhysician external {

        Patient_ID=Patient_Id;
        Drug1CRN=Drug1CRN_;
        Drug2CRN=Drug2CRN_;
        Drug3CRN=Drug3CRN_;

        emit PresciptionCreated(msg.sender,Patient_ID,bytes32(bytes(IPFShash_)));
    }

    //PharmacySelection
    function Pharmacies_Selection(address Pharmacy_) OnlyPatient external{
        require(selectionCounter[msg.sender]<5,"You cannot select more that 5 Pharmacies");
        require(reg.pharmacies(Pharmacy_) == true, "only registered Pharmacys can be selected");

        PharmaciesSelection[msg.sender].push(PharmacySelect(Pharmacy_, true));
        selectionCounter[msg.sender]++;
        ApprovalState=ApprovalRequestState.Pending;
        emit PharmacySelected(msg.sender, selectionCounter[msg.sender]);
    }

    //PharmacyApproval
    function PharmacyApproval(address Patient_) OnlyPharmacy external{
        require(ApprovalState == ApprovalRequestState.Pending, "Request is already proccessed");
        for(uint i=0;i<selectionCounter[Patient_];i++){
            if (PharmaciesSelection[Patient_][i].registeredPharmacy==msg.sender && PharmaciesSelection[Patient_][i].isSelected==true){
                ApprovalState=ApprovalRequestState.Approved;
            }
        }
        emit PharmacyApprovalStateChanged();
    }

    
    //RequestInsuranceApproval 
    function RequestInsuranceApproval(uint Patient_,uint Drug1CRN_,uint Drug2CRN_,uint Drug3CRN_) OnlyPharmacy external {
        Patient_ID = Patient_;
        Drug1CRN=Drug1CRN_;
        Drug2CRN=Drug2CRN_; 
        Drug3CRN=Drug3CRN_; 
        InsuranceApprovalstate=InsuranceApprovalState.Pending;
        emit RequestInsuranceApprovalStateChanged();
    }
    

    //InsuranceApproval
    function InsuranceApproval(InsuranceApprovalState _insApproval,address _Pharmacy,uint patient_) OnlyInsuranceCompany external{

        require(reg.pharmacies(_Pharmacy)==true,"Pharmacy not registered");
        require(InsuranceApprovalstate == InsuranceApprovalState.Pending,"Request already proccessed");
        Patient_ID=patient_;

        if (_insApproval==InsuranceApprovalState.Approved){
            emit InsuranceApprovalStateChanged();
        }

        if (_insApproval == InsuranceApprovalState.Rejected){
        
         emit InsuranceApprovalStateChanged();
        }
    }

    //MediacationPreparation
    function MedicationPreparetion(uint patient_) OnlyPharmacy external{
        require(InsuranceApprovalstate==InsuranceApprovalState.Approved,"Claim is rejected");
        Patient_ID=patient_;
        MedicineCollectionstate==MedicineCollectionState.ReadyForCollection;

        emit MedicationPreperationStateChanged();
    } 

    //MedicationCollection
    function MedicationCollection(uint patient_,bytes32 hash_)OnlyPatient external{
        require(MedicineCollectionstate==MedicineCollectionState.ReadyForCollection,"Not ready Try again later");
        Patient_ID=patient_;
        MedicineCollectionstate==MedicineCollectionState.Collected;

        emit MedicationCollected();

    }

    //PaymentRequest
    function PaymentRequest(uint MedicationInvoiceId_,uint Drugtotalcost)OnlyPharmacy external{
        require(MedicineCollectionstate==MedicineCollectionState.Collected,"wait till medicine is collected");
        MedicationInvoice_ID=MedicationInvoiceId_;
        DrugTotalCost=Drugtotalcost;
        Paymentstate==PaymentState.pending;

        emit PaymentRequested();
    }

    //ClaimPayment
    function ClaimPayment(uint MedicationInvoiceId_) OnlyInsuranceCompany external payable  {
        MedicationInvoice_ID=MedicationInvoiceId_;
        require(Paymentstate == PaymentState.pending, "Can't claim payment");
        require(msg.value == DrugTotalCost, "Paid Amount is not covering the claim");
        Paymentstate = PaymentState.paid;
        //require(msg.value==totalDrugCost, "amount mismatch,please check again");
        
        emit PaymentClaimed();
    }
}