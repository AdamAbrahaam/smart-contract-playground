import { ethers } from "hardhat";

const fs = require("fs");
const path = require("path");

const contracts = [
  {
    name: "Greeter",
    args: ["Hello !"],
  },
  {
    name: "PiggyBank",
    args: [],
  },
  {
    name: "EventTickets",
    args: [],
  },
];

async function publishContract(
  contractName: string,
  contractArgs: string[],
  chainId: string | number
) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const contract = await contractFactory.deploy(...contractArgs);

  console.log(contractName + " contract address: " + contract.address);

  // copy the contract JSON file to front-end and add the address field in it
  fs.copyFileSync(
    path.join(
      __dirname,
      "../artifacts/contracts/" +
        contractName +
        ".sol/" +
        contractName +
        ".json"
    ), // source
    path.join(__dirname, `../../client/src/contracts/` + contractName + ".json") // destination
  );

  // check if addresses.json already exists
  const exists = fs.existsSync(
    path.join(__dirname, `../../client/src/contracts/addresses.json`)
  );

  // if not, create the file
  if (!exists) {
    fs.writeFileSync(
      path.join(__dirname, `../../client/src/contracts/addresses.json`),
      "{}"
    );
  }

  // update the addresses.json file with the new contract address
  const addressesFile = fs.readFileSync(
    path.join(__dirname, `../../client/src/contracts/addresses.json`)
  );
  const addressesJson = JSON.parse(addressesFile);

  if (!addressesJson[contractName]) {
    addressesJson[contractName] = {};
  }

  addressesJson[contractName][chainId] = contract.address;

  fs.writeFileSync(
    path.join(__dirname, `../../client/src/contracts/addresses.json`),
    JSON.stringify(addressesJson)
  );
}

async function main() {
  const [deployer] = await ethers.getSigners();

  const networkData = await deployer.provider?.getNetwork();
  if (!networkData) {
    console.error("No network data found");
    process.exitCode = 1;
    return;
  }

  console.log("Chain ID:", networkData.chainId);

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  for (const contract of contracts) {
    await publishContract(contract.name, contract.args, networkData.chainId);
  }
}

main()
  .then(() => (process.exitCode = 0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
