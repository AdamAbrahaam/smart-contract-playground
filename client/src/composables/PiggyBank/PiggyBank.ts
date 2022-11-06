import { ref } from 'vue'
import { useContracts } from "@/composables/contracts";
import { utils } from "ethers";
import { useContractToast } from '@/composables/contractToast'

export const usePiggyBank = async () => {
  const { connectToContract } = useContracts();
  const { contractToastError } = useContractToast()
  const contract = await connectToContract("PiggyBank");
  const balance = ref(utils.formatEther(await contract.getBalance()))
  const savingNames = ref(await contract.getSavingNames())
  const pending = ref<boolean>(false)
  const selectedSaving = ref<string | null>(null)
  const savingDetails = ref(null)

  contract.on('BalanceChanged', async (newBalance) => {
    balance.value = utils.formatEther(newBalance)
    await getSavingDetails()
    pending.value = false
  })
  
  contract.on('SavingCreated', async () => {
    contractToastError(async () => {
      savingNames.value = await contract.getSavingNames()
    })
  })
  
  const createSaving = async (newSavingName: string, newSavingLimit: string) => {
    contractToastError(async () => {
      const sendTx = await contract.createSaving(newSavingName, utils.parseEther(newSavingLimit))
      await sendTx.wait()     
    })
  }
  
  const getSavingDetails = async () => {
    contractToastError(async () => {
      savingDetails.value = await contract.getSavingDetails(selectedSaving.value)
    })
  }
  
  const deposit = async (amount: string) => {
    if (!selectedSaving.value) {
      return
    }

    contractToastError(async () => {
      const sendTx = await contract.deposit(selectedSaving.value, utils.parseEther(amount), { value: utils.parseEther(amount) })
      pending.value = true
      await sendTx.wait()
    })
  }

  const withdraw = async (amount: string) => {
    if (!selectedSaving.value) {
      return
    }

    contractToastError(async () => {
      await contract.withdraw(selectedSaving.value, utils.parseEther(amount))
    })
  }

  return {
    balance,
    savingNames,
    pending,
    savingDetails,
    selectedSaving,
    createSaving,
    getSavingDetails,
    deposit,
    withdraw,
    formatEther: utils.formatEther
  }
};
