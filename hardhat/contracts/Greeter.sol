//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    event BalanceChanged(uint256 balance);

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit(uint256 amount) public payable {
        require(msg.value == amount);
        emit BalanceChanged(this.getBalance());
    }

    function withdraw(uint256 amount) public {
        require(amount <= address(this).balance);
        payable(msg.sender).transfer(amount);
        emit BalanceChanged(this.getBalance());
    }
}
