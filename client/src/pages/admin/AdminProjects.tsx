import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useProjects,
  useDeleteProject
} from "../../hooks/projects";
import { Skeleton } from "../../utils/skeleton";
import { FileText, Trash2, Edit3 } from "lucide-react";
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
      <section className="max-w-6xl mx-auto py-24 px-6">
      
        <div className="mb-10 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 p-5 space-y-3"
            >
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-amber-400">
          Projects
        </h1>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-xl"
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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <ProjectForm
            mode={formMode}
            project={selected ?? undefined}
            onSuccess={closeModal}
          />
    
          <button
            type="button"
            onClick={closeModal}
            className="mt-4 text-sm text-zinc-400"
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    </section>
  );
}