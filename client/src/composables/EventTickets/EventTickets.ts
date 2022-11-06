import { ref } from 'vue'
import { useContracts } from "@/composables/contracts";
import { useContractToast } from '@/composables/contractToast'
import { utils } from "ethers";

export const useEventTickets = async () => {
  const { connectToContract } = useContracts();
  const { contractToastError, contractToastInfo, contractToastSuccess } = useContractToast()
  const contract = await connectToContract("EventTickets");
  const events = ref(await contract.getEvents())

  const createEvent = (eventName: string, dateTime: string, price: string) => {
    contractToastError(async () => {
      const sendTx = await contract.createEvent(eventName, dateTime, utils.parseEther(price))
      contractToastInfo('Transaction pending', 'Transaction is pending, this might take a couple minutes.')

      await sendTx.wait()
      contractToastSuccess('Success', 'Transaction finished successfully')
    })
  }

  const buyTicket = (eventId: string, amount: string) => {
    contractToastError(async () => {
      const sendTx = await contract.mint(eventId, amount, { value: amount })
      contractToastInfo('Transaction pending', 'Your ticket is being minted, this might take a couple minutes.')

      await sendTx.wait()
      contractToastInfo('Success', 'Ticket minted successfully')
    })
  }

  return {
    events,
    createEvent,
    buyTicket,
    formatEther: utils.formatEther
  }
};
