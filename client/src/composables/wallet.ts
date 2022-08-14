import { useWalletStore } from "@/stores/wallet";
import { ethers } from "ethers";
import { markRaw, computed } from "vue";
import type { Web3Provider } from "@ethersproject/providers/src.ts/web3-provider";


export const useWallet = () => {
  const walletStore = useWalletStore()
  
  const connectedAddress = computed(() => walletStore.connectedAddress)

  const provider = computed<Web3Provider>(() => markRaw(walletStore.provider ?? new ethers.providers.Web3Provider(window.ethereum)));

  const getConnectedAddress = async () => {
    const accounts = await provider.value.listAccounts()
    walletStore.setConnectedAddress(accounts[0])
  }

  const connectWallet = async () => {
    await provider.value.send("eth_requestAccounts", []);
  };

  window.ethereum.on('accountsChanged', function (accounts: string[]) {
    walletStore.setConnectedAddress(accounts[0])
  });

  if (!walletStore.provider) {
    walletStore.setProvider(provider.value)
    getConnectedAddress()
  }

  return {
    connectedAddress,
    provider,
    connectWallet
  };
};
