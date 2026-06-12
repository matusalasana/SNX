import api from "../../api"
import { useQuery } from "@tanstack/react-query";


const getUser = async () => {
  const res = await api.get("/auth/me")
  return res.data.user
}

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
    retry: false,
    staleTime: 1000*60*30,
  });
};