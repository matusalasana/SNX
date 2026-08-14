import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

type UploadThumbnail = {
  id: string;
  formData: FormData;
}
const uploadThumbnail = async ({
  formData,
  id
}: UploadThumbnail) => {

  const res = await api.patch(`/blogs/${id}/thumbnail`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }});
    
  return res.data;
};

export const useUploadThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadThumbnail,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};