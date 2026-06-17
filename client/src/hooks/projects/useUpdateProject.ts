import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";


const updateProject = async ({ id, data }) => {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success("Project updated successfully");
    },

    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
};