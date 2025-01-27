// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;


contract Registration{
    //the variables
    address regiulatory_authority;
        //mapping(address->uint) Patient;
        //mapping(address->uint) Insurance_Comapny;
        //mapping(address->uint) Phycisian;
        //mapping(address->uint) Pharmacy;


    //The functions

    //PhysicianRegistration : to register physician using there address
    function PhysicianRegistration(address){}

    //InsuaranceCompanyRegistration : to register Insurance Comany using it's address
    function InsuranceCompanyRegistration(){}
    
    //PharmacyRegistration: to register pharmacy using it's addresss
    function PharmacyRegistration(address){}

    //patientRegistration: to register patient using their Address
    function patientRegister(address){}

}


contract Approval{

    //the variables

    bytes32 IPFShash;
    enum AprovalRequestState;//give dict    
    enum InsuranceApprovalState;//give dict
    enum MedicineCollectionState;//give dict
    enum PayementState;//give dict
    uint Patient_ID;
    uint Drug1CRN;
    uint Drug2CRN;
    uint Drug3CRN;
    uint MedicationInvoice_ID;
    Uint DrugTotalCost;
    uint PaidAmount;

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
    function InsuranceApproval(enum,address,uint){}

    //MediacationPreparation
    function MedicationPreperation(uint){}

    //MedicationCollection
    function MedicationCollection(uint,bytes32){}

    //PaymentRequest
    function PaymentRequest(uint,uint){}

    //ClaimPayment
    function ClaimPayment(uint){}
}