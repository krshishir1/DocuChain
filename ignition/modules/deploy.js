const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DocuChainModule = buildModule("Document", (m) => {
  const contract = m.contract("DocuChain", [], {id : "fourth"});

  return { contract };
});

module.exports = DocuChainModule;