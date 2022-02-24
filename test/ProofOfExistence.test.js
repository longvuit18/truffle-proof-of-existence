const Poe = artifacts.require("ProofOfExistence");
const truffleAssert = require('truffle-assertions');

contract("ProofOfExistence Test", async accounts => {
    let instance = null;
    let hashData = null;
    const proof = {
        name: "Vu Vu",
        age: 22,
        phoneNumber: "01230123"
    };
    beforeEach(async () => {
        instance = await Poe.deployed();
        const encodeParameters = web3.eth.abi.encodeParameters(['string','uint', 'string'], [proof.name, proof.age, proof.phoneNumber]);
        hashData = web3.utils.soliditySha3(encodeParameters);
    })
    it("should return address of sender", async () => {
        await instance.addProof(proof.name, proof.age, proof.phoneNumber, {from: accounts[0]});
        const senderAddress = await instance.getOwnerOfProof(hashData);

        assert.equal(senderAddress, accounts[0], "Hash data error!");
    });

    it("should throw an error if you add same proof again", async () => {
        await truffleAssert.reverts(instance.addProof(proof.name, proof.age, proof.phoneNumber, {from: accounts[1]}), "Proof was existence!");
    });

    it("should transfer a proof to another account", async () => {
        const receiver = accounts[1];
        await instance.transferProof(receiver, hashData, {from: accounts[0]});

        const ownerProof = await instance.getOwnerOfProof(hashData);
        assert.equal(ownerProof, accounts[1], "transfer error!");
    })

    it("should display error if transfer to itself", async () => {
        const currentAccount = accounts[1];
        await truffleAssert.reverts(instance.transferProof(currentAccount, hashData, {from: currentAccount}), "Can't not send itself!");
    })

    it("should display error if transfer a proof is not exist", async () => {
        const encodeParameters = web3.eth.abi.encodeParameters(['string','uint', 'string'], [proof.name, proof.age, "123456789"]);
        const newHashData = web3.utils.soliditySha3(encodeParameters);
        const currentAccount = accounts[1];
        await truffleAssert.reverts(instance.transferProof(currentAccount, newHashData, {from: accounts[2]}), "Proof is not existence!");
    })
})