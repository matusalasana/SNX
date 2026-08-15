import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const deleteCertification = async (id: string) => {
  const res = await api.delete(`/certifications/${id}`);

  return res.data;
};

export const useDeleteCertification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertification,

    onSuccess: () => {
      toast.success("Certification deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["certifications"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};