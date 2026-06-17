import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const deleteMessage = async (id: string) => {
  const res = await api.delete(`/messages/${id}`);

  return res.data;
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,

    onSuccess: () => {
      toast.success("Message deleted");

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};