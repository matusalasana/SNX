import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getExperiences = async () => {
  const res = await api.get("/experiences");
  return res.data;
};

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
    staleTime: 1000 * 60 * 30,
  });
};