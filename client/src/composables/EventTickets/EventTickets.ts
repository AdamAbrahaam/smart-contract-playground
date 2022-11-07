import { useEventTicketsRepository } from '@/composables/EventTickets/EventTicketsRepository'
import { useWalletStore } from '@/stores/wallet'
import { ref } from 'vue'
import { useContracts } from "@/composables/contracts";
import { useContractToast } from '@/composables/contractToast'
import { utils } from "ethers";

export const useEventTickets = async () => {
  const { connectToContract } = useContracts();
  const { contractToastError, contractToastInfo, contractToastSuccess } = useContractToast()
  const { connectedAddress } = useWalletStore()
  const { getAddressNFTsByCollection } = useEventTicketsRepository()

  const contract = await connectToContract("EventTickets");
  const events = ref(await contract.getEvents())
  const addressTickets = ref([])

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

  const getAddressTickets = async () => {
    getAddressNFTsByCollection(connectedAddress, contract.address)
      .then(async data => {
        addressTickets.value = (await data.json()).ownedNfts
      })
  }

  contract.on('EventCreated', async () => {
    contractToastInfo('Events', 'Event list is being updated')
    events.value = await contract.getEvents()
  })

  contract.on('TicketMinted', async () => {
    contractToastInfo('Tickets', 'New ticket minted, ticket list is being updated')
    getAddressTickets()
  })

  getAddressTickets()

  return {
    events,
    addressTickets,
    createEvent,
    buyTicket,
    formatEther: utils.formatEther
  }
};
