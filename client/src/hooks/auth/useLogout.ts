import api from "../../api"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const logoutUser = async () => {
  const res = await api.post(`/auth/logout`)
  return res.data
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: logoutUser,
    
    onSuccess: () => {
      queryClient.clear()
      toast.success("Logged out successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}