import { useState } from "react";
import { useCreateProject } from "./useCreateProject";
import { useUpdateProject } from "./useUpdateProject";
import { useDeleteProject } from "./useDeleteProject";
import { Project } from "../../types/projects";

export function useProjectForm() {
  const { mutate: createProject, isPending: creating } = useCreateProject();
  const { mutate: updateProject, isPending: updating } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  const [modal, setModal] = useState<null | "create" | Project>(null);

  const openCreate = () => setModal("create");
  const openEdit = (project: Project) => setModal(project);
  const closeModal = () => setModal(null);

  const submitProject = (formData: FormData) => {
    if (modal && typeof modal === "object") {
      updateProject(
        { id: modal.id, data: formData },
        { onSuccess: () => closeModal() }
      );
    } else {
      createProject(formData,
        { onSuccess: () => closeModal() }
      );
    }
  };

  const isEditing = modal !== null && modal !== "create";
  const currentProject = typeof modal === "object" ? modal : undefined;

  return {
    modal,
    openCreate,
    openEdit,
    closeModal,

    submitProject,
    deleteProject,

    currentProject,
    isEditing,

    creating,
    updating,
  };
}