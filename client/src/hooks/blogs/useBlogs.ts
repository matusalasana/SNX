import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 1000 * 60 * 30,
  });
};