import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getSkill = async (id: string) => {
  const res = await api.get(`/skills/${id}`);
  return res.data;
};

export const useSkill = (id: string) => {
  return useQuery({
    queryKey: ["skill", id],
    queryFn: () => getSkill(id),
    enabled: !!id,
  });
};