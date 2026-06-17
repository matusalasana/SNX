import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const deleteSkill = async (id: string) => {
  const res = await api.delete(`/skills/${id}`);

  return res.data;
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,

    onSuccess: () => {
      toast.success("Skill deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};