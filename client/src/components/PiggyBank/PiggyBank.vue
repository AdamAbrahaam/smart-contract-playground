<template>
  <div class="flex justify-content-between">
    <span class="p-float-label w-full">
      <InputText id="savingName" type="text" v-model="newSaving" class="w-full" />
      <label for="savingName">Saving name</label>
    </span>
    <span class="p-float-label w-full">
      <InputText id="withdrawLimit" type="text" v-model="savingLimit" class="w-full" />
      <label for="withdrawLimit">Withdraw limit</label>
    </span>
  </div>
  <Button class="p-button-outlined w-full" @click="createSaving(newSaving, savingLimit)" label="Create saving" />


  <Dropdown v-model="selectedSaving" :options="savingNames" placeholder="Your saving accounts" class="w-full mt-8" @change="getSavingDetails()" />
  <template v-if="savingDetails">
    <ProgressSpinner v-if="pending" class="w-full"/>
    <template v-else>
      <p>
        Current Amount: {{ formatEther(savingDetails.currentAmount) }}
      </p>
      <p>
        Saving Limit: {{ formatEther(savingDetails.savingLimit) }}
      </p>

      <div class="p-inputgroup">
        <InputText placeholder="Deposit amount" v-model="depositAmount"/>
        <Button icon="pi pi-upload" class="p-button-warning p-button-lg" @click="deposit(depositAmount)" />
      </div>

      <div class="p-inputgroup">
        <InputText placeholder="Withdraw amount" v-model="withdrawAmount" />
        <Button icon="pi pi-download" class="p-button-warning p-button-lg" @click="withdraw(withdrawAmount)" />
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { usePiggyBank } from "@/composables/PiggyBank/PiggyBank";
import { ref } from "vue";

const {
  savingNames,
  savingDetails,
  createSaving,
  getSavingDetails,
  deposit,
  withdraw,
  formatEther,
  selectedSaving,
  pending
} = await usePiggyBank()

const newSaving = ref<string>('')
const savingLimit = ref<string>('')
const depositAmount = ref<string>('')
const withdrawAmount = ref<string>('')
</script>
