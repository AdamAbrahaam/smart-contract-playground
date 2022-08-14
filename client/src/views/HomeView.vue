<template>
  <main>
    <Suspense>
      <TheWelcome v-if="connectedAddress" />
    </Suspense>
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import { useWallet } from "@/composables/wallet";

const { connectedAddress } = useWallet()
</script>
