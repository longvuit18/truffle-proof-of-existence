// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProofOfExistence {
    // variables

    // mappings
    mapping(bytes32 => address) Proofs;

    // events
    event ProofSuccess(address _sender, bytes32 _proofId);
    event TransferProofSuccess(address _sender, address _receiver, bytes32 _proofId);

    
    // functions

    // add a proof
    function addProof(string memory name, uint age, string memory phoneNumber) public returns (bool) {
        bytes32 hashData = keccak256(abi.encode(name, age, phoneNumber));

        require(Proofs[hashData] == address(0x0), "Proof was existence!");
        Proofs[hashData] = msg.sender;
        // listMetaData.push(MetaData(hashData, name, age, phoneNumber));

        // emit
        emit ProofSuccess(msg.sender, hashData);
        return true;
    }
    
    // transfer 1 proof
    function transferProof(address receiver, bytes32 proofId) public returns (bool) {
        require(msg.sender != receiver, "Can't not send itself!");
        require(Proofs[proofId] == msg.sender, "Proof is not existence!");

        Proofs[proofId] = receiver;
        emit TransferProofSuccess(msg.sender, receiver, proofId);
        return true;
    }

    function getOwnerOfProof(bytes32 proofId) public view returns (address) {
        return Proofs[proofId];
    }
    
}
