const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

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

// Check if connected to Ganache
web3.eth.getAccounts()
  .then(accounts => {
    if (accounts.length > 0) {
      connectionStatus.innerText = `Connected to Ganache: ${accounts.length} account(s) found.`;
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
      connectionStatus.innerText = 'No accounts found. Please check Ganache.';
      connectionStatus.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error connecting to Ganache:', error);
    connectionStatus.innerText = 'Error connecting to ethereum node. Please ensure it is running.';
    connectionStatus.style.color = 'red';
  });

// All registration functions

async function PhysiciansRegistration(value) {
    try{

      const accounts = await web3.eth.getAccounts();
      console.log("First Account (Expected Deployer):", accounts[0]);
      const regulatoryAuthority = await RegistrationContract.methods.regulatory_authority().call();
      console.log("Regulatory Authority from Contract:", regulatoryAuthority);
      alert ("First Account (Expected Deployer): ", accounts[0], "\n Regulatory Authority from Contract: ",regulatoryAuthority);
      

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
      return;
    }
      await RegistrationContract.methods.PharmacyRegistration(value).send({ from: selectedAccount });
      console.log('Pharmacy registration successful.');
      alert('pharmacy registration successful.');
    }catch(error){
      console.log('Error registering pharmacy:', error);
      alert('!!Error!! Pharmacy registration Unsuccessful.');
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
  await ApprovalContract.methods.PrescriptionCreation(patientid,drug1,drug2,drug3).send({ from: selectedAccount });
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

async function InsuranceApprovalRequest(value) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.RequestInsuranceApproval(value).send({ from: selectedAccount });
  console.log( 'Insurance approval request successful.');
  alert('Insurance approval request successful.');

  }catch(error){
    console.error('Error requesting insurance approval:', error);
    alert('!!Error!! Insurance approval request Unsuccessful.');
  }
}

async function InsuranceApproval(pharmacyid,patientid) {
  try {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value; // Get the selected account from the dropdown
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.RequestInsuranceApproval(pending,pharmacyid,patientid).send({ from: selectedAccount});
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
  await ApprovalContract.methods.MedicationPreparetion(value).send({ from: selectedAccount });
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
    
    if (!selectedAccount) {
      alert('Please select an account first.');
      return;
    }
  await ApprovalContract.methods.ClaimPayment(value).send({ from: selectedAccount });
  console.log('Payment claim successful.');
  alert( 'Payment claim successful.');
  }catch(error){
    console.error('Error claiming payment:', error);
    alert('!!Error!! Payment claim Unsuccessful.');
  }
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
document.getElementById('Pharmacy_Registration').addEventListener('click',()=> {
  let Pharmacy=document.getElementById('pharmacy_reg').value
  PharmaciesRegistration(Pharmacy);});

//FOR CONTRACT APPROVAL
document.getElementById('createpresciption').addEventListener('click', () => {
  let patientID=document.getElementById('Patient_id').value;
  let drug1=document.getElementById('Drug1').value;
  let drug2=document.getElementById('Drug2').value;
  let drug3=document.getElementById('Drug3').value;
  PresciptionCreation(patientID,drug1,drug2,drug3) });

  //pharmacy selection********************************

  //document.getElementById('Pharmacy_Registration').addEventListener('click', PharmaciesRegistration);

  //pharmacy approval
  document.getElementById('approvepharmacy').addEventListener('click', () => {
    let patient_id=document.getElementById('patient_id').value;
    PharmacyApproval(patient_id)});

  //request insurance approval
  document.getElementById('requestapproval').addEventListener('click', () => {
    let patientID=document.getElementById('Patient_id_').value;
    let drug1=document.getElementById('Drug1_').value;
    let drug2=document.getElementById('Drug2_').value;
    let drug3=document.getElementById('Drug3_').value;
    InsuranceApprovalRequest(patientID,drug1,drug2,drug3) });

// insurance approval
document.getElementById('approval').addEventListener('click', () => {
  let pharmacyid=document.getElementById('pharmacy_ID').value;
  let patientID=document.getElementById('patientID').value; 
  InsuranceApproval(pharmacyid,patientID) });

// medicine preparation
document.getElementById('preparemedicine').addEventListener('click',()=>{
  let patientid=document.getElementById('patientId').value;

  medicine_preparation(patientid);});

//medicine collection
document.getElementById('medicinecollect').addEventListener('click',()=>{
  let  patientid=document.getElementById('patientId').value;

  medicine_collection(patientid);});

//request payment
document.getElementById('requestpayment').addEventListener('click',()=>{
  let invoiceid=document.getElementById('medicineinvoiceid').value;
  let totalcost=document.getElementById('medicinecost').value;
  requestpayment(invoiceid,totalcost) });

//claim payment
document.getElementById('paymentclaim').addEventListener('click',()=>{
  let  invoiceid=document.getElementById('medicineinvoice_id').value;

  Claimpayment(invoiceid)});
