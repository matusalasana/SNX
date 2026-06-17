import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getExperience = async (id: string) => {
  const res = await api.get(`/experiences/${id}`);
  return res.data;
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: () => getExperience(id),
    enabled: !!id,
  });
};