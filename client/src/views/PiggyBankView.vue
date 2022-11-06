<template>
  <main>
    <Suspense>
      <PiggyBank v-if="connectedAddress" />
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import PiggyBank from "@/components/PiggyBank/PiggyBank.vue";
import { useWallet } from "@/composables/wallet";

const { connectedAddress } = useWallet()
</script>
