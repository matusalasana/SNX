import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getProject = async (id: string) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });
};