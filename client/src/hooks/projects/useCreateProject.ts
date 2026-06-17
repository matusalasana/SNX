import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Project } from "../../types/projects"

const createProject = async (data: Project) => {
  const res = await api.post("/projects", data);

  return res.data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      toast.success("Project created successfully");

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};