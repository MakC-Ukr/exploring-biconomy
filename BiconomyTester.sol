//SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "https://github.com/opengsn/forwarder/blob/master/contracts/BaseRelayRecipient.sol";

contract BiconomyTester is BaseRelayRecipient{
    uint public x ;
    address public owner;

    // constructor (address _trustedForwarder) public{
    constructor () public{
        owner = _msgSender();
        trustedForwarder = 0xF82986F574803dfFd9609BE8b9c7B92f63a1410E;
    }

    function versionRecipient() external override virtual view returns (string memory){
        return "1";
    }

    function increaseX() public {
        x+=1;
    }

}