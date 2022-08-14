<template>
  <span v-if="connectedAddress">Connected {{ connectedAddress }}</span>
  <button v-else @click="connectWallet">Connect</button>
</template>

<script setup lang="ts">
import { useWallet } from "@/composables/wallet";

const { connectedAddress, connectWallet } = useWallet()

</script>
