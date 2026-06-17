import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const deleteExperience = async (id: string) => {
  const res = await api.delete(`/experiences/${id}`);

  return res.data;
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      toast.success("Experience deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};