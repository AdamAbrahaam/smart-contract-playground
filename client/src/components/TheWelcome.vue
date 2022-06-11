<template>
  <button @click="sendEth">Send ETH</button>
  Balance: {{ formattedBalance }}
</template>

<script setup lang="ts">
import { useContracts } from "@/composables/contracts";
import { utils } from "ethers";
import { computed, ref } from "vue";

const { connectToContract } = useContracts();
const contract = await connectToContract("Greeter");
const balance = ref(await contract.getBalance())
const formattedBalance = computed(() => utils.formatEther(balance.value))

contract.on('BalanceChanged', (newBalance) => {
  balance.value = newBalance
})

const sendEth = async () => {
  const sendEthTx = await contract.deposit(utils.parseEther("1"), { value: utils.parseEther("1") });
  await sendEthTx.wait();
}

</script>
