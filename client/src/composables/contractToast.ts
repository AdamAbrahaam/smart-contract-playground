import { useToast } from "primevue/usetoast";

export const useContractToast = () => {
  const toast = useToast();
  const life = 6000

  const contractToastError = async (contractMethod: () => Promise<void>) => {
    try {
      await contractMethod()
    } catch (error) {
      const message = error?.error?.data?.message?.substring(
        error.error.data.message.indexOf("'") + 1, 
        error.error.data.message.lastIndexOf("'")
      ) ?? error?.data?.message ?? error.message
  
      toast.add({severity:'error', summary: 'Error', detail: message, life});
    }
  }

  const contractToastInfo = (title: string, message: string) => {
    toast.add({severity:'info', summary: title, detail: message, life});
  }

  const contractToastSuccess = (title: string, message: string) => {
    toast.add({severity:'success', summary: title, detail: message, life});
  }

  return {
    contractToastError,
    contractToastInfo,
    contractToastSuccess
  }
}
