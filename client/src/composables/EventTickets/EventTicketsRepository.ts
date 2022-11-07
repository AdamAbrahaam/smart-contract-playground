export const useEventTicketsRepository = () => {
  const api_key = import.meta.env.VITE_ALCHEMY_API_KEY
  const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAddressNFTsByCollection = (connectedAddress: string, contractAddress: string): Promise<any> => {
    return fetch(`${baseURL}/getNFTs/?owner=${connectedAddress}&contractAddresses%5B%5D=${contractAddress}`, { method: 'GET' })
  }
  
  return {
    getAddressNFTsByCollection
  }
}
