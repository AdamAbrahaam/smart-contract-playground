import { Contract, ethers } from "ethers";
import addresses from "@/contracts/addresses.json";
import { ref } from "vue";

interface ChainIdWithAddress {
  [chainId: string]: string
}

interface ContractAddresses {
  [contractName: string]: ChainIdWithAddress
}

export const useContracts = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = ref<Contract | null>(null);

  const connectToContract = async (contractName: string) => {
    const network = await provider.getNetwork()
    const signer = provider.getSigner();

    const contractAddress = (addresses as ContractAddresses)[contractName][network.chainId];
    const contractInterface = await import(`../contracts/${contractName}.json`);

    return new ethers.Contract(contractAddress, contractInterface.abi, signer);
  };

  return {
    contract,
    connectToContract,
  };
};
