import { ethers } from "ethers";
import { ref } from "vue";


export const useWallet = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signerAddress = ref<string | null>(null)

  const getSignerAddress = async () => {
    signerAddress.value = await provider.getSigner().getAddress();
  }
  getSignerAddress()

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
  };

  return {
    connectWallet,
    signerAddress
  };
};
