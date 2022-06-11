<template>
  <span v-if="connectedAddress">Connected</span>
  <button v-else @click="connectWallet">Connect</button>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { ref } from "vue";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const connectedAddress = ref<string>((await provider.listAccounts())[0]);

window.ethereum.on('accountsChanged', function (accounts: string[]) {
  connectedAddress.value = accounts[0];
});

const connectWallet = async () => {
  await provider.send("eth_requestAccounts", []);
};

</script>
