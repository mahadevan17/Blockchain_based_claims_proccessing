// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;


contract Registration{
    //the variables
    address regiulatory_authority;
        //mapping(address->uint) Patient;
        //mapping(address->uint) Insurance_Comapny;
        //mapping(address->uint) Phycisian;
        //mapping(address->uint) Pharmacy;


    //modifiers



    //events
    event PhysicianRegistered();
    event InsuranceCompanyRegistered();
    event PharmacyRegistered();
    event patientRegistered();

    //The functions

    //PhysicianRegistration : to register physician using there address
    function PhysicianRegistration(address)internal{}

    //InsuaranceCompanyRegistration : to register Insurance Comany using it's address
    function InsuranceCompanyRegistration(address)internal {}
    
    //PharmacyRegistration: to register pharmacy using it's addresss
    function PharmacyRegistration(address)internal{}

    //patientRegistration: to register patient using their Address
    function Register(address)internal{}

}


contract Approval{

    //the variables

    bytes32 IPFShash;
    enum AprovalRequestState{Pending,Approved}  
    enum InsuranceApprovalState{Pending,Approved,Rejected}
    enum MedicineCollectionState{ReadyForCollection,Collected}
    enum PayementState{pending,paid}
    uint Patient_ID;
    uint Drug1CRN;
    uint Drug2CRN;
    uint Drug3CRN;
    uint MedicationInvoice_ID;
    uint DrugTotalCost;
    uint PaidAmount;
    mapping(address=>int) selectionCounter;

    //constructor

    /*constructor(){
        for(int i=0;i<5;i++){
            //All patients selections values must be zero initially
        }

    }*/

    //modifiers
    modifier OnlyPhysician(){
        require(msg.sender==Physician,"Only Physician can create Prescription");
        _;
    }

    modifier OnlyPatient(){
        require(msg.sender==Patient,"Only Patient is allwoed to select pharmacies");
        _;
    }

    modifier OnlyPharmacy(){
        require(msg.sender==Pharmacy,"Only registered pharmacies is allowed");
        _;
    }

    modifier OnlyInsuranceCompany(){
        require(msg.sender==InsuranceCompany,"Only Insurance company can call this function");
        _;
    }

    //events

    event PresciptionCreated(address indexed Physician,uint256 timestamp);
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
    function PresciptionCreation(uint Patient_Id,uint Drug1CRN_,uint Drug2CRN_,uint Drug3CRN_ ,bytes IPFShash_) OnlyPhysician external {
        //require(address==Physician,"Only Physician can call this function");
        // AddIPFShash
        emit PresciptionCreated(msg.sender,block.timestamp);
    }

    //PharmacySelection
    function PharmaciesSelection(address Pharmacy_) OnlyPatient external{
        require(selectionCounter[msg.caller]<5,"You cannot select more that 5 Pharmacies");
        selectionCounter[msg.sender]++;
        ApprovalRequestState.Pending;
        emit PharmacySelected(msg.sender, selectionCounter[msg.sender]);
    }

    //PharmacyApproval
    function PharmacyApproval(address Patient_) OnlyPharmacy external{
        require(ApprovalRequestState==Pending, "Request is already proccessed");
        for(int i=0;i<selectionCounter[Patient_];i++){
            // if (PharmaciesSelection[patient][i]
            // RegisteredPharmacies)
            //(PharmaciesSelection[patient][i] true)
            //    then
            //ApprovalState Approved
            //end


        }
        emit PharmacyApprovalStateChanged();
    }

    //RequestInsuranceApproval
    function RequestInsuranceApproval(uint,uint,uint,uint) OnlyPharmacy external {
        InsuranceApprovalState=Pending;
        emit RequestInsuranceApprovalStateChanged();
    }

    //InsuranceApproval
    function InsuranceApproval(InsuranceApprovalState,address,uint )OnlyInsuranceCompany external{
        require(InsuranceApprovalState==Pending,"Request already proccessed");
        /*  ifApprovalRequestState Approvedthen
    Emitaneventdeclaringthatprescriptionhas
    beenapproved
    end
  ifApprovalRequestState Rejectedthen
  Emit an event declaring that prescription has
       been rejected
  end  */
    }

    //MediacationPreparation
    function MedicationPreparetion(uint) OnlyPharmacy external{
        require(InsuranceApprovalState==Approved,"Claim is rejected");

        MedicineCollectionState=ReadyForCollection;

        emit MedicationPreperationStateChanged();
    } 

    //MedicationCollection
    function MedicationCollection(uint Patient_Id,bytes32 hash_)OnlyPatient external{
        require(MedicineCollectionState==ReadyForCollection,"Not ready Try again later");
        
        MedicineCollectionState=Collected;

        emit MedicationCollected();

    }

    //PaymentRequest
    function PaymentRequest(uint MedicationInvoiceId_,uint Drugtotalcost)OnlyPharmacy external{
        require(MedicationCollectionState==collected,"wait till medicine is collected");
        PayementState=Pending;

        emit PaymentRequested();
    }

    //ClaimPayment
    function ClaimPayment(uint totalDrugCost) OnlyInsuranceCompany external {
        require(PayementState==Pending,"payment alrready proccessed");
        require(msg.value==totalDrugCost, "amount mismatch,please check again");
        PaymentState=Paid;
        emit PaymentClaimed();
    }
}