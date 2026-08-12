import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
  });
};