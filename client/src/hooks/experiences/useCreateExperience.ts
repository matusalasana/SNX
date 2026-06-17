import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Experience } from "../../types/experiences"

const createExperience = async (data: Experience) => {
  const res = await api.post("/experiences", data);

  return res.data;
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExperience,

    onSuccess: () => {
      toast.success("Experience added successfully");

      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};