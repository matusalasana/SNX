import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { MessageFormData } from "../../schema/messages"

const sendMessage = async (data: MessageFormData) => {
  const res = await api.post("/messages", data);

  return res.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,

    onSuccess: () => {
      toast.success("Message sent successfully");

      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};