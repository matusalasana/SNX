import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { type CertificationFormData } from "../../schema/certifications";

type UpdateCertificationInput = {
  id: string;
  data: CertificationFormData;
};

const updateCertification = async ({ id, data }: UpdateCertificationInput) => {
  const res = await api.patch(`/certifications/${id}`, data);

  return res.data;
};

export const useUpdateCertification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCertification,

    onSuccess: () => {
      toast.success("Certification updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["certifications"],
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};