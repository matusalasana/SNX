import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Blog } from "../../types/blogs"

type UpdateBlogInput = {
  id: string;
  data: Blog;
};

const updateBlog = async ({ id, data }: UpdateBlogInput) => {
  const res = await api.patch(`/blogs/${id}`, data);

  return res.data;
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,

    onSuccess: () => {
      toast.success("Blog updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};