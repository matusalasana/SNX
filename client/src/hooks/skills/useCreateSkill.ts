import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Skill } from "../../types/skills"

const createSkill = async (data: Skill) => {
  const res = await api.post("/skills", data);

  return res.data;
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,

    onSuccess: () => {
      toast.success("Skill created successfully");

      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};