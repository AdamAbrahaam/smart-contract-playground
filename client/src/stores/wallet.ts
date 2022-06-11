import { defineStore } from "pinia";
import type { Web3Provider } from "@ethersproject/providers/src.ts/web3-provider";

export const useWalletStore = defineStore({
  id: "wallet",
  state: () => ({
    provider: null as Web3Provider | null
  }),
  getters: {
    signer: (state) => state.provider?.getSigner() ?? null,
  },
  actions: {
    setProvider(provider: Web3Provider | null) {
      this.provider = provider;
    },
  },
});
