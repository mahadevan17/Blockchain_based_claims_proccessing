const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let API_KEY;
let API_SECRET;
let API_GATEWAY;

fetch("/config")
  .then((response) => response.json())
  .then((config) => {

    API_KEY = config.API_KEY; 
    API_SECRET = config.API_SECRET;
    API_GATEWAY = config.API_GATEWAY;
    
    console.log("API Key from Server:", API_KEY);
    console.log("API SECRET from Server:", API_SECRET);
    console.log("API Gateway from Server:", API_GATEWAY);
  })
  .catch((error) => console.error("Error fetching config:", error));

//*************************THERE ARE TWO CONTRACTS SO NEED TO INITIALIZE 2 CONTRACTS ************************************/
// Replace with your deployed contract's ABI and address
const Registration_contractABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "insuranceCompany",
      "type": "address"
    }
  ],
  "name": "InsuranceCompanyRegistered",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "patient",
      "type": "address"
    }
  ],
  "name": "PatientRegistered",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "pharmacy",
      "type": "address"
    }
  ],
  "name": "PharmacyRegistered",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "physician",
      "type": "address"
    }
  ],
  "name": "PhysicianRegistered",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_insuranceCompany",
      "type": "address"
    }
  ],
  "name": "InsuranceCompanyRegistration",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_patient",
      "type": "address"
    }
  ],
  "name": "PatientRegistration",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_pharmacy",
      "type": "address"
    }
  ],
  "name": "PharmacyRegistration",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_Physician",
      "type": "address"
    }
  ],
  "name": "PhysicianRegistration",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "insuranceCompanies",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "patients",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "pharmacies",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "physicians",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "regulatory_authority",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}]; 
const Registration_contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Approval_contractABI=[{
  "inputs": [
    {
      "internalType": "address",
      "name": "_reg_contract_address",
      "type": "address"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "Insurance_Company",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "medicationinvoiceID",
      "type": "uint256"
    }
  ],
  "name": "ClaimPaid",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "_pharmacy",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "medicationinvoiceID",
      "type": "uint256"
    }
  ],
  "name": "PaymentRequested",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "pharmacy",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "status",
      "type": "uint256"
    }
  ],
  "name": "PharmacyApprovalStateChanged",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "patient",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "selectionCount",
      "type": "uint256"
    }
  ],
  "name": "PharmacySelected",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "Physician",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "_IPFShash",
      "type": "bytes32"
    }
  ],
  "name": "PrescriptionCreated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "Insurance_Company",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "insuranceApprovalstatus",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "_Pharmacyaddress",
      "type": "address"
    }
  ],
  "name": "RequestApproval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "_pharmacy",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    }
  ],
  "name": "RequestInsuranceApprovalStateChanged",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "Insurance_Company",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "insuranceApprovalstatus",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "_Pharmacyaddress",
      "type": "address"
    }
  ],
  "name": "RequestRejection",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "Patient",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "_IPFShash",
      "type": "bytes32"
    }
  ],
  "name": "medicationcollected",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "_pharmacy",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "PatientID",
      "type": "uint256"
    }
  ],
  "name": "medicationisprepread",
  "type": "event"
},
{
  "inputs": [],
  "name": "ApprovalState",
  "outputs": [
    {
      "internalType": "enum Approval.ApprovalRequestState",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_medicationinvoiceID",
      "type": "uint256"
    }
  ],
  "name": "ClaimPayment",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [],
  "name": "Drug1CRN",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "Drug2CRN",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "Drug3CRN",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "DrugTotalCost",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "IPFShash",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "",
      "type": "bytes32"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "enum Approval.InsuranceApprovalState",
      "name": "_insApproval",
      "type": "uint8"
    },
    {
      "internalType": "address",
      "name": "_Pharmacy",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "patient_",
      "type": "uint256"
    }
  ],
  "name": "InsuranceApproval",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "InsuranceApprovalstate",
  "outputs": [
    {
      "internalType": "enum Approval.InsuranceApprovalState",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "patient_",
      "type": "uint256"
    }
  ],
  "name": "MedicationCollection",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "MedicationInvoice_ID",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "patient_",
      "type": "uint256"
    }
  ],
  "name": "MedicationPreparation",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "MedicineCollectionstate",
  "outputs": [
    {
      "internalType": "enum Approval.MedicineCollectionState",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "PaidAmount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "Patient_ID",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "MedicationInvoiceId_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drugtotalcost",
      "type": "uint256"
    }
  ],
  "name": "PaymentRequest",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "Paymentstate",
  "outputs": [
    {
      "internalType": "enum Approval.PaymentState",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "PharmaciesSelection",
  "outputs": [
    {
      "internalType": "address",
      "name": "registeredPharmacy",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "isSelected",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "Pharmacy_",
      "type": "address"
    }
  ],
  "name": "Pharmacies_Selection",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "Patient_",
      "type": "address"
    }
  ],
  "name": "PharmacyApproval",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "Patient_Id",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug1CRN_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug2CRN_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug3CRN_",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "IPFShash_",
      "type": "string"
    }
  ],
  "name": "PrescriptionCreation",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "Patient_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug1CRN_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug2CRN_",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "Drug3CRN_",
      "type": "uint256"
    }
  ],
  "name": "RequestInsuranceApproval",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "selectionCounter",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}];
const Approval_contractAddress='0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'



// Create Registration contract instance
const RegistrationContract = new web3.eth.Contract(Registration_contractABI, Registration_contractAddress);
// Create  Approval contract instance
const ApprovalContract = new web3.eth.Contract(Approval_contractABI, Approval_contractAddress);

// Connection status element
const connectionStatus = document.getElementById('connection-status');

// Check if connected to hardhat
web3.eth.getAccounts()
  .then(accounts => {
    if (accounts.length > 0) {
      connectionStatus.innerText = `Connected to hardhat: ${accounts.length} account(s) found.`;
      connectionStatus.style.color = 'green';
      accountDropdown.innerHTML = '<option value="">Select an account</option>';
      
      // Populate dropdown with account addresses
      accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account;
        option.textContent = account;
        accountDropdown.appendChild(option);
      });


    } else {
      connectionStatus.innerText = 'No accounts found. Please check hardhat.';
      connectionStatus.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error connecting to hardhat:', error);
    connectionStatus.innerText = 'Error connecting to ethereum node. Please ensure it is running.';
    connectionStatus.style.color = 'red';
  });

// All registration functions

async function PhysiciansRegistration(value) {
    try{
     const accountDropdown = document.getElementById('accountDropdown');
      const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
      await RegistrationContract.methods.PhysicianRegistration(value).send({ from: selectedAccount });
      console.log('Physician registration successful.');
      alert('Physician registration successful.');
    }
    catch(error){
      console.error('Error registering physician:', error);
      alert('!!ERROR!!Physician registration Unsuccessful.');
    }
}

async function InsuranceCompaniesRegistration(value) {
  try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
    await RegistrationContract.methods.InsuranceCompanyRegistration(value).send({ from: selectedAccount });
    
    console.log('Insurance Company registration successful.');
    alert('Insurance Company registration successful.');
  }catch(error){
    console.error('Error registering Insurance Company:', error);
      alert('!!Error!! Insurance Company registration Unsuccessful.');
  }
}
async function PharmaciesRegistration(value) {
    try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return false;
    }
      await RegistrationContract.methods.PharmacyRegistration(value).send({ from: selectedAccount });
      console.log('Pharmacy registration successful.');
      alert('pharmacy registration successful.');

      updatePharmacyDropdown(value); // Update the pharmacy dropdown with the newly registered pharmacy



    }catch(error){
      console.log('Error registering pharmacy:', error);
      alert('!!Error!! Pharmacy registration Unsuccessful.');
      return false;
    }
    
  }

async function PatientsRegistration(value) {
    try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
      await RegistrationContract.methods.PatientRegistration(value).send({ from: selectedAccount });
      console.log('Patient registration successful.');
      alert('Patient registration successful.');
    }catch(error){
      console.error('Error registering patient:', error.reason);
      alert('!!Error!! Patient registration Unsuccessful.');
    }
  }


//APPROVAL************************************************
async function PresciptionCreation(patientid,drug1,drug2,drug3) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }

    let hash=await uploadToIPFS(patientid,drug1,drug2,drug3); // Upload the prescription to IPFS
    if (!hash) {
      alert('Failed to upload to IPFS. Try again.');
      return;
    }

  await ApprovalContract.methods.PrescriptionCreation(patientid,drug1,drug2,drug3,hash).send({ from: selectedAccount });
  console.log('Prescription creation successful.');
  alert('Prescription creation successful.');
  } catch (error) {
    console.error('Error creating prescription:', error);
    alert('!!Error!! Prescription creation Unsuccessful. check if 1)patient is registered 2)request is coming from registered physician');
  }

}

async function PharmacySelection(value) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }

  await ApprovalContract.methods.Pharmacies_Selection(value).send({ from: selectedAccount });
  console.log('Pharmacy selection successful.');
  alert( 'Pharmacy selection successful.');
  } catch (error) {
    console.error('Error selecting pharmacy:', error);
    alert('!!Error!! Pharmacy selection Unsuccessful.');
  }

}

async function PharmacyApproval(value) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.PharmacyApproval(value).send({ from: selectedAccount });
  console.log('Pharmacy approval successful.');
  alert('Pharmacy approval successful.');
  } catch (error) {
    console.error('Error approving pharmacy:', error);
    alert('!!Error!! Pharmacy approval Unsuccessful.');
  }

}


//check with Machine Learning model

async function submitTransaction(userData) {
  try {
      // Send data to ML model API
      const response = await fetch(ML_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features: userData }),
      });

      const result = await response.json();
      if (!result.approved) {
          alert("Transaction rejected by ML model.");
          return true;
      }
      else{
        return false
      }
      
    } catch (error) {
        console.error("Error:", error);
        alert("Transaction failed.");
    }
}

async function fetchPrescriptionFromIPFS(ipfsHash) {
  const response = await fetch(`https://${API_GATEWAY}/ipfs/${ipfsHash}`);
  return response.json(); // Return prescription data
}



async function checkML(){

  try{
    let isfraud=await submitTransaction(patientID);
    let prescriptionData = await fetchPrescriptionFromIPFS(prescriptionIPFSHash); // Fetch prescription data from IPFS

    if (isfraud){
      console.log("flagging patient id and prescription id");
      prescriptionData.PotentialFraud = 1;
      prescriptionData.prevIpfs=prescriptionIPFSHash; //store the patient id in the prescription data

      
      // Re-upload updated prescription JSON to IPFS
      const newIPFSHash = await updateFraudStatus(prescriptionIPFSHash,1);
      
      document.getElementById('AI_info').innerText="Potential Fraud Detected";
    }

    else {
      document.getElementById('AI_info').innerText="Looks safe to proceed";
      console.log("no flag patient id and prescription id are not fraud");
    }

  }
  
  catch(error){
    console.error('Error requesting insurance approval:', error);
    alert("!!Error try again");
  }
}

async function InsuranceApprovalRequest(prescriptionIPFSHash) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
    let prescriptionData = await fetchPrescriptionFromIPFS(prescriptionIPFSHash);
    let patientID=prescriptionData.patientID;
    let drug1=prescriptionData.drug1;
    let drug2=prescriptionData.drug2;
    let drug3=prescriptionData.drug3;

  await ApprovalContract.methods.RequestInsuranceApproval(patientID,drug1,drug2,drug3).send({ from: selectedAccount });
  console.log( 'Insurance approval request successful.');
  alert('Insurance approval request successful.');

  }catch(error){
    console.error('Error requesting insurance approval:', error);
    alert('!!Error!! Insurance approval request Unsuccessful.');
  }
}

async function InsuranceApproval(patientID_IPFS,pharmacyid,patientid) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }

    let prescriptionData = await fetchPrescriptionFromIPFS(patientID_IPFS);
    if  (prescriptionData.PotentialFraud==1) {
      alert('Cannot approve prescription due to potential fraud');
      return;
    }

    let _insApproval=document.getElementById("Approve_ins").value;
    
  await ApprovalContract.methods.InsuranceApproval(_insApproval,pharmacyid,patientid).send({ from: selectedAccount});
  console.log('Insurance approval successful.');
  alert( 'Insurance approval successful.');

  } catch (error) {
    console.error('Error requesting insurance approval:', error);
    alert("!!Error!! Insurance approval Unsuccessful.");
  }
}

async function medicine_preparation(value) {
  try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.MedicationPreparation(value).send({ from: selectedAccount });
  console.log('Medication preparation successful.');
  alert('Medication preparation successful.')
  } catch (error) {
    console.error('Error preparing medication:', error);
    alert('!!Error!! Medication preparation Unsuccessful.');
  }
}

async function medicine_collection(value) {
  try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.MedicationCollection(value).send({ from: selectedAccount });
  console.log('Medication collection successful.');
  alert( 'Medication collection successful.');


  }catch(error){
    console.error('Error collecting medication:', error);
    alert('!!Error!! Medication collection Unsuccessful.');
  }
}

async function requestpayment(invoiceid,totalcost) {
  try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.PaymentRequest(invoiceid,totalcost).send({ from: selectedAccount });
  console.log('Payment request successful.');
  alert( 'Payment request successful.');

  }catch(error){
    console.error('Error requesting payment:', error);
    alert('!!Error!! Payment request Unsuccessful.');
  }

}

async function Claimpayment(value) {
  try{
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown

    let amt=await ApprovalContract.methods.DrugTotalCost().call()

    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.ClaimPayment(value).send({ from: selectedAccount , value: amt });
  console.log('Payment claim successful.');
  alert( 'Payment claim successful.');
  }catch(error){
    console.error('Error claiming payment:', error);
    alert('!!Error!! Payment claim Unsuccessful.');
  }
}

//for ipfs uploading 

async function uploadToIPFS(patientid, drug1, drug2, drug3) {

  if (!API_KEY || !API_SECRET) {
    console.error("API keys are not loaded yet!");
    return;
  }

  if (!patientid || !drug1 || !drug2 || !drug3) {
    alert("Please fill in all fields!");
    return null;
  }

  const jsonData = {
    PotentialFraud:0,
    patientID: patientid,
    drug1: drug1,
    drug2: drug2,
    drug3: drug3,
    timestamp: new Date().toISOString(), // Adds a timestamp for record keeping
    prevIpfs:0
  };

  const metadata = {
    name: `Prescription_${patientid}`, 
  };

  const pinataBody = {
    pinataContent: jsonData,
    pinataMetadata: metadata // Add filename metadata
  };

  document.getElementById("ipfs-status").innerText = "Uploading...";

  try {
    let response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pinata_api_key": API_KEY,
        "pinata_secret_api_key": API_SECRET
      },
      body: JSON.stringify(pinataBody),
    });

    let data = await response.json();
    
    if (data.IpfsHash) {
      document.getElementById("ipfs-status").innerText = "Upload Successful!";
      document.getElementById("ipfsHash").innerText = data.IpfsHash;
      console.log("Data uploaded to IPFS:", data);
      return data.IpfsHash;
    } else {
      document.getElementById("ipfs-status").innerText = "Upload failed!";
      console.error("Upload failed:", data);
      return null;
    }
  } catch (error) {
    document.getElementById("ipfs-status").innerText = "Error uploading!";
    console.error("Error:", error);
    return null; 
  }
}

//updating status of potential fraud

async function updateFraudStatus(currentIpfsHash, newFraudValue) {
  if (!API_KEY || !API_SECRET) {
    console.error("API keys not loaded!");
    return;
  }

  if (!currentIpfsHash) {
    alert("Please enter the current IPFS hash!");
    return null;
  }

  const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${currentIpfsHash}`;

  try {
    // Fetch existing data
    const response = await fetch(ipfsUrl);
    const existingData = await response.json();

    // Modify data
    const updatedData = {
      ...existingData,
      PotentialFraud: newFraudValue,
      timestamp: new Date().toISOString(),
      prevIpfs: currentIpfsHash
    };

    const metadata = {
      name: `Prescription_${existingData.patientID}_Updated`
    };

    const pinataBody = {
      pinataContent: updatedData,
      pinataMetadata: metadata
    };

    // Upload to Pinata
    const uploadResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "pinata_api_key": API_KEY,
        "pinata_secret_api_key": API_SECRET
      },
      body: JSON.stringify(pinataBody)
    });
  
  }catch(error){
    alert("Update falied try again");
  }
}

//This is for dynamic update of Phamacy drop down menu

function updatePharmacyDropdown(newAddress) {
  const pharmacyDropdown = document.getElementById("pharmacyDropdown");

  const option = document.createElement("option");
    option.value = newAddress;
    option.textContent = newAddress;
    pharmacyDropdown.appendChild(option);
  }


//FOR CONTRACT REGISTRATION
document.getElementById('Physician_Registration').addEventListener('click', () => {
  let Physician=document.getElementById('physician_reg').value
  PhysiciansRegistration(Physician);
});

document.getElementById('Patient_Registration').addEventListener('click',() =>{
  let patient=document.getElementById('patient_reg').value
  PatientsRegistration(patient);});
document.getElementById('InsuranceCompanyRegistration').addEventListener('click',()=>{
  let  InsuranceCompany=document.getElementById('Company_reg').value
  InsuranceCompaniesRegistration(InsuranceCompany)});

document.getElementById('Pharmacy_Registration').addEventListener('click',async ()=> {
  let Pharmacy=document.getElementById('pharmacy_reg').value

  PharmaciesRegistration(Pharmacy); 

  });

//FOR CONTRACT APPROVAL
document.getElementById('createpresciption').addEventListener('click', () => {
  let patientID=document.getElementById('Patient_id').value;
  let drug1=document.getElementById('Drug1').value;
  let drug2=document.getElementById('Drug2').value;
  let drug3=document.getElementById('Drug3').value;
  PresciptionCreation(patientID,drug1,drug2,drug3) });

  //pharmacy selection********************************

  document.getElementById('select-pharmacy').addEventListener('click', () => {
    let selectedPharmacy = document.getElementById('pharmacyDropdown').value;

    if (!selectedPharmacy) {
        alert("Please select a pharmacy.");
        return;
    }

    PharmacySelection(selectedPharmacy);});

  //pharmacy approval
  document.getElementById('approvepharmacy').addEventListener('click', () => {
    let patient_id=document.getElementById('patient_id').value;
    PharmacyApproval(patient_id)});

  //request insurance approval
  document.getElementById('requestapproval').addEventListener('click', () => {
    let patientIDIPFS=document.getElementById('Patient_id_IPFS').value; 
    InsuranceApprovalRequest(patientIDIPFS) });

  //for ai button
  document.getElementById('ML_approval').addEventListener('click', async () => {
    let patientID_IPFS=document.getElementById('patientIDIPFS').value;

    let prescriptionData = await fetchPrescriptionFromIPFS(patientID_IPFS);
    let patientID=prescriptionData.patientID;
    let drug1=prescriptionData.drug1;
    let drug2=prescriptionData.drug2;
    let drug3=prescriptionData.drug3;

    await checkML(patientID,drug1,drug2,drug3); //need 13 variables

     });

  //for ml over ride
  document.getElementById('button_override').addEventListener('click', async () =>{
    let patientID_IPFS=document.getElementById('patientIDIPFS').value;

    let prescriptionData = await fetchPrescriptionFromIPFS(patientID_IPFS);

    let override = confirm("Do you want to override the AI's decision?");
      if (override == true) {
        await updateFraudStatus(patientID_IPFS,!prescriptionData.PotentialFraud);     
     }
      else{
        alert("Not overRidden");
      }

    ;});


// insurance approval ************************NEEDS UPDATE *******************************
document.getElementById('approval').addEventListener('click', () => {
  let pharmacyid=document.getElementById('pharmacy_ID').value;
  let patientID=document.getElementById('patientID').value; 
  let patientIDIPFS=document.getElementById('patientIDIPFS').value;
  InsuranceApproval(patientIDIPFS,pharmacyid,patientID) });

// medicine preparation
document.getElementById('preparemedicine').addEventListener('click', () => {
  let patientid=document.getElementById('patientId').value;

  medicine_preparation(patientid);});

//medicine collection
document.getElementById('medicinecollect').addEventListener('click',()=>{
  let  patientid=document.getElementById('patientId').value;

  medicine_collection(patientid);});

//request payment
document.getElementById('paymentrequest').addEventListener('click',()=>{
  let invoiceid=document.getElementById('medicineinvoiceid').value;
  let totalcost=document.getElementById('medicinecost').value;
  requestpayment(invoiceid,totalcost) });

//claim payment
document.getElementById('paymentclaim').addEventListener('click',()=>{
  let  invoiceid=document.getElementById('medicineinvoice_id').value;
  Claimpayment(invoiceid)});
