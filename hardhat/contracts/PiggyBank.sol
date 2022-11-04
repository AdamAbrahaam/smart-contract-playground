//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PiggyBank {
    struct Saving {
        uint256 savingLimit;
        uint256 currentAmount;
    }

    mapping(address => mapping(string => Saving)) userSavings;
    mapping(address => string[]) userSavingNames;

    event BalanceChanged(uint256 balance);
    event SavingCreated();

    function createSaving(string memory _name, uint256 _savingLimit) public {
        require(bytes(_name).length > 0, "Saving name not set");
        require(_savingLimit > 0, "Saving limit not defined");

        Saving memory newSaving = Saving(_savingLimit, 0);
        userSavings[msg.sender][_name] = newSaving;
        userSavingNames[msg.sender].push(_name);
        emit SavingCreated();
    }

    function deposit(string memory _savingName, uint256 _amount)
        public
        payable
    {
        require(bytes(_savingName).length > 0, "Saving name not defined");
        require(msg.value == _amount, "Invalid amount");
        require(_amount > 0, "Amount must be higher than 0");

        userSavings[msg.sender][_savingName].currentAmount += _amount;
        emit BalanceChanged(this.getBalance());
    }

    function withdraw(string memory _savingName, uint256 _amount) public {
        require(bytes(_savingName).length > 0, "Saving name not defined");
        require(_amount > 0, "Amount must be higher than 0");

        Saving memory saving = userSavings[msg.sender][_savingName];
        require(_amount <= saving.currentAmount, "Trying to withdraw more than available");
        require(saving.currentAmount >= saving.savingLimit, "Trying to withdraw before limit reached");

        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "Withdraw transaction failed");

        userSavings[msg.sender][_savingName].currentAmount -= _amount;
        emit BalanceChanged(this.getBalance());

        if (saving.currentAmount > 0) {
          return;
        }

        delete userSavings[msg.sender][_savingName];

        bool nameFound = false;
        for (uint256 i = 0; i < userSavingNames[msg.sender].length - 1; i++) {
            if (!nameFound) {
                nameFound = keccak256(abi.encodePacked((userSavingNames[msg.sender][i]))) == keccak256(abi.encodePacked((_savingName)));
            } else {
                userSavingNames[msg.sender][i - 1] = userSavingNames[msg.sender][i];
            }
        }
        userSavingNames[msg.sender].pop();
    }

    function getSavingNames() public view returns (string[] memory) {
        return userSavingNames[msg.sender];
    }

    function getSavingDetails(string memory _savingName)
        public
        view
        returns (Saving memory)
    {
        require(bytes(_savingName).length > 0, "Saving name not defined");
        return userSavings[msg.sender][_savingName];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
