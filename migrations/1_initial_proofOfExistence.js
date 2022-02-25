const Poe = artifacts.require("../contracts/ProofOfExistence.sol");

module.exports = function (deployer) {
  deployer.deploy(Poe);
};
