import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getSkills = async () => {
  const res = await api.get("/skills");
  return res.data;
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
    staleTime: 1000 * 60 * 30,
  });
};