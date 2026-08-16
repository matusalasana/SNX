import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useProjects,
  useDeleteProject
} from "../../hooks/projects";
import { Skeleton } from "../../utils/skeleton";
import ProjectCard from "../../components/admin/ProjectCard";
import ProjectForm from "../../components/admin/ProjectForm";
import { Project } from "../../types/projects"

export default function AdminProjects() {
  const { data: projects = [], isLoading } = useProjects();
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  
  const openCreate = () => {
    setSelected(null);
    setFormMode("create");
  };
  
  const openEdit = (project: Project) => {
    setSelected(project);
    setFormMode("edit");
  };
  
  const closeModal = () => {
    setSelected(null);
    setFormMode(null);
  };
  
  if (isLoading) {
    return (
      <section className="container-custom section">
      
        <div className="mb-10 space-y-3">
          <Skeleton className="skeleton h-6 w-32" />
          <Skeleton className="skeleton h-10 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card p-5 space-y-3"
            >
              <Skeleton className="skeleton h-40 w-full rounded-xl" />
              <Skeleton className="skeleton h-4 w-3/4" />
              <Skeleton className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom section text-content">

      {/* HEADER */}
      <div className="flex-between items-center mb-10">
        <h1 className="heading text-3xl font-bold">
          Projects
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Project 
        </button>
      </div>
      
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => openEdit(project)}
            onDelete={() => deleteProject(project.id)}
          />
        ))}
      </div>
        
      {/* MODAL */}
      {formMode && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-background/80 backdrop-blur-sm p-4">
        <div className="card mx-auto w-full max-w-xl p-6">
          <ProjectForm
            mode={formMode}
            project={selected ?? undefined}
            onSuccess={closeModal}
          />
    
          <button
            type="button"
            onClick={closeModal}
            className="btn-ghost mt-4 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    </section>
  );
}
