import { useState } from "react";
import { useCreateBlog } from "./useCreateBlog";
import { useUpdateBlog } from "./useUpdateBlog";
import { useDeleteBlog } from "./useDeleteBlog";
import { Blog } from "../../types/blogs";

export function useBlogForm() {
  const { mutate: createBlog, isPending: creating } = useCreateBlog();
  const { mutate: updateBlog, isPending: updating } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [modal, setModal] = useState<null | "create" | Blog>(null);

  const openCreate = () => setModal("create");
  const openEdit = (blog: Blog) => setModal(blog);
  const closeModal = () => setModal(null);

  const submitBlog = (formData: FormData) => {
    if (modal && typeof modal === "object") {
      updateBlog({ id: modal.id, data: formData });
    } else {
      createBlog(formData);
    }
  };

  const isEditing = modal !== null && modal !== "create";
  const currentBlog = typeof modal === "object" ? modal : undefined;

  return {
    modal,
    openCreate,
    openEdit,
    closeModal,

    submitBlog,
    deleteBlog,

    currentBlog,
    isEditing,

    creating,
    updating,
  };
}