import { Contract, ethers } from "ethers";
import addresses from "@/contracts/addresses.json";
import { ref } from "vue";
import { useWallet } from "./wallet";

interface ChainIdWithAddress {
  [chainId: string]: string
}

interface ContractAddresses {
  [contractName: string]: ChainIdWithAddress
}

export const useContracts = () => {
  const { provider } = useWallet()
  const contract = ref<Contract | null>(null);

  const connectToContract = async (contractName: string) => {
    const network = await provider.value.getNetwork()
    const signer = provider.value.getSigner();

    const contractAddress = (addresses as ContractAddresses)[contractName][network.chainId];
    const contractInterface = await import(`../contracts/${contractName}.json`);

    return new ethers.Contract(contractAddress, contractInterface.abi, signer);
  };

  return {
    contract,
    connectToContract,
  };
};
