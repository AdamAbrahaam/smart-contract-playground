//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PiggyBank {
    struct Saving {
        uint256 savingLimit;
        uint256 currentAmount;
    }

    mapping(address => mapping(string => Saving)) userSavings;
    mapping(address => string[]) userSavingNames;

    function createSaving(string memory _name, uint256 _savingLimit) public {
        require(bytes(_name).length > 0);
        require(_savingLimit > 0);

        Saving memory newSaving = Saving(_savingLimit, 0);
        userSavings[msg.sender][_name] = newSaving;
        userSavingNames[msg.sender].push(_name);
    }

    function deposit(string memory _savingName, uint256 _amount)
        public
        payable
    {
        require(bytes(_savingName).length > 0);
        require(msg.value == _amount);
        require(_amount > 0);

        userSavings[msg.sender][_savingName].currentAmount += _amount;
    }

    function withdraw(string memory _savingName) public {
        require(bytes(_savingName).length > 0);

        Saving memory saving = userSavings[msg.sender][_savingName];
        require(
            saving.currentAmount >= saving.savingLimit,
            "Trying to withdraw before limit reached"
        );

        payable(msg.sender).transfer(saving.currentAmount);
        delete userSavings[msg.sender][_savingName];

        bool nameFound = false;
        for (uint256 i = 0; i < userSavingNames[msg.sender].length - 1; i++) {
            if (!nameFound) {
                nameFound =
                    keccak256(
                        abi.encodePacked((userSavingNames[msg.sender][i]))
                    ) ==
                    keccak256(abi.encodePacked((_savingName)));
            } else {
                userSavingNames[msg.sender][i] = userSavingNames[msg.sender][
                    i + 1
                ];
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
        require(bytes(_savingName).length > 0);
        return userSavings[msg.sender][_savingName];
    }
}
