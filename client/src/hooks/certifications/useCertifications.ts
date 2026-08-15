import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getCertifications = async () => {
  const res = await api.get("/certifications");
  return res.data;
};

export const useCertifications = () => {
  return useQuery({
    queryKey: ["certifications"],
    queryFn: getCertifications,
    staleTime: 1000 * 60 * 30,
  });
};