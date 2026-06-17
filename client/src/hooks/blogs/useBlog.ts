import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getBlog = async (id: string) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
};