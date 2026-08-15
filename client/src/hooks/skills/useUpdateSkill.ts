import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { SkillFormData } from "../../schema/skills"

type UpdateSkillInput = {
  id: string;
  data: SkillFormData;
};

const updateSkill = async ({ id, data }: UpdateSkillInput) => {
  const res = await api.patch(`/skills/${id}`, data);

  return res.data;
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,

    onSuccess: () => {
      toast.success("Skill updated successfully");

      // refresh list
      queryClient.invalidateQueries({
        queryKey: ["skills"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};