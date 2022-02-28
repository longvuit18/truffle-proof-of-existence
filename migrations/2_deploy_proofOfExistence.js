const Poe = artifacts.require("ProofOfExistence");

module.exports = function (deployer) {
  deployer.deploy(Poe);
};
