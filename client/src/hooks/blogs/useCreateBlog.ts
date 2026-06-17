import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Blog } from "../../types/blogs"

const createBlog = async (data: Blog) => {
  const res = await api.post("/blogs", data);

  return res.data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,

    onSuccess: () => {
      toast.success("Blog published successfully");

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};