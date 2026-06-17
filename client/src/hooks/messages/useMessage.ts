import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getMessage = async (id: string) => {
  const res = await api.get(`/messages/${id}`);
  return res.data;
};

export const useMessage = (id: string) => {
  return useQuery({
    queryKey: ["message", id],
    queryFn: () => getMessage(id),
    enabled: !!id,
  });
};