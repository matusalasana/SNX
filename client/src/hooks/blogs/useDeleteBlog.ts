import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const deleteBlog = async (id: string) => {
  const res = await api.delete(`/blogs/${id}`);

  return res.data;
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,

    onSuccess: () => {
      toast.success("Blog deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};