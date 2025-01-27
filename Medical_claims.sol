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
    function PhysicianRegistration(address){}

    //InsuaranceCompanyRegistration : to register Insurance Comany using it's address
    function InsuranceCompanyRegistration(address){}
    
    //PharmacyRegistration: to register pharmacy using it's addresss
    function PharmacyRegistration(address){}

    //patientRegistration: to register patient using their Address
    function Register(address){}

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
    Uint DrugTotalCost;
    uint PaidAmount;

    //modifiers


    //events

    event PresciptionCreated();
    event PharmacyApprovalStateChanged();
    event RequestInsuranceApprovalStateChanged();
    event InsuranceApprovalStateChanged();
    event MedicationPreperationStateChanged();
    event MedicationCollected();
    event PaymentRequested();
    event PaymentClaimed();

    //functions to implement

    //PrescriptionCreation functiona can be run by registered physician only
    function PresciptionCreation(uint Patient_ID,uint Drug1CRN,uint Drug2CRN,uint Drug3CRN ,bytes IPFShash) {}

    //PharmacySelection
    function PharmaciesSelection(address){}

    //PharmacyApproval
    function PharmacyApproval(address){}

    //RequestInsuranceApproval
    function RequestInsuranceApproval(uint,uint,uint,uint){}

    //InsuranceApproval
    function InsuranceApproval(enum InsuranceApprovalState,address,uint){}

    //MediacationPreparation
    function MedicationPreperation(uint){}

    //MedicationCollection
    function MedicationCollection(uint,bytes32){}

    //PaymentRequest
    function PaymentRequest(uint,uint){}

    //ClaimPayment
    function ClaimPayment(uint){}
}