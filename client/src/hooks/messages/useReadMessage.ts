import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Message } from "../../types/messages";

type ReadMessageInput = {
  id: string;
  data: Message;
};

const readMessage = async ({ id, data }: ReadMessageInput) => {
  const res = await api.patch(`/messages/${id}/read`);

  return res.data;
};

export const useReadMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readMessage,

    onSuccess: () => {
      toast.success("Message read");

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
      
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};