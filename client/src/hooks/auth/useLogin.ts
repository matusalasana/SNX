import api from "../../api"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { type LoginInput } from "../../types/auth"

const loginUser = async (data: LoginInput) => {
  const res = await api.post(`/auth/login`, data)
  return res.data.user
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation ({
    mutationFn: loginUser, 
    onSuccess: () => {
      toast.success("You have logged in successfully")
      queryClient.invalidateQueries({
        queryKey: ["auth"]
      })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    }
  })
}