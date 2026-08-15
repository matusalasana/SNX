import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { type CertificationFormData } from "../../schema/certifications"

const createCertification = async (data: CertificationFormData) => {
  const res = await api.post("/certifications", data);

  return res.data;
};

export const useCreateCertification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertification,

    onSuccess: () => {
      toast.success("Certification added successfully");

      queryClient.invalidateQueries({
        queryKey: ["certifications"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};