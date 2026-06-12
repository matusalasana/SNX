import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getProjects = async() => {
  const res = await api.get("/projects")
  return res.data;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
};