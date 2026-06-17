import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getMessages = async () => {
  const res = await api.get("/messages");
  return res.data;
};

export const useMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    staleTime: 1000 * 60 * 10,
  });
};