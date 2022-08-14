<template>
  <input v-model="amount" />
  <button @click="send">Send ETH</button>
  Balance: {{ pending ? '...' : formattedBalance }}
</template>

<script setup lang="ts">
import { useContracts } from "@/composables/contracts";
import { utils } from "ethers";
import { computed, ref } from "vue";

const { connectToContract } = useContracts();
const contract = await connectToContract("Greeter");
const balance = ref(await contract.getBalance())
const pending = ref<boolean>(false)
const amount = ref<string>('0')
const formattedBalance = computed(() => utils.formatEther(balance.value))

contract.on('BalanceChanged', (newBalance) => {
  balance.value = newBalance
  pending.value = false
})

const send = async () => {
  const sendTx = await contract.deposit(utils.parseEther("0.00001"), { value: utils.parseEther("0.00001") });
  pending.value = true
  await sendTx.wait();
}

</script>
