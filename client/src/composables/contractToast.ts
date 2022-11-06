import { useToast } from "primevue/usetoast";

export const useContractToast = () => {
  const toast = useToast();

  const contractToastError = async (contractMethod: () => Promise<void>) => {
    try {
      await contractMethod()
    } catch (error) {
      const message = error?.error?.data?.message?.substring(
        error.error.data.message.indexOf("'") + 1, 
        error.error.data.message.lastIndexOf("'")
      ) ?? error.message
  
      toast.add({severity:'error', summary: 'Error', detail: message, life: 3000});
    }
  }

  const contractToastInfo = (title: string, message: string) => {
    toast.add({severity:'info', summary: title, detail: message, life: 3000});
  }

  const contractToastSuccess = (title: string, message: string) => {
    toast.add({severity:'success', summary: title, detail: message, life: 3000});
  }

  return {
    contractToastError,
    contractToastInfo,
    contractToastSuccess
  }
}
