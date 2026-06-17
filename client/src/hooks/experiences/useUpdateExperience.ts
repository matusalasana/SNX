import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Experience } from "../../types/experiences";

type UpdateExperienceInput = {
  id: string;
  data: Experience;
};

const updateExperience = async ({ id, data }: UpdateExperienceInput) => {
  const res = await api.patch(`/experiences/${id}`, data);

  return res.data;
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExperience,

    onSuccess: () => {
      toast.success("Experience updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["experiences"],
      });
      
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};