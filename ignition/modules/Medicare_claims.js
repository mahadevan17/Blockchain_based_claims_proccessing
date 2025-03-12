const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MedicareClaimsModule", (m) => {
    // Deploy the Registration contract first
    const registrationContract = m.contract("Registration", []);

    // Deploy the Approval contract with Registration's address as a constructor argument
    const approvalContract = m.contract("Approval", [registrationContract]);

    return { registrationContract, approvalContract };
});
