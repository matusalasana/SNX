import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useExperiences,
  useDeleteExperience
} from "../../hooks/experiences";
import { type ExperienceFormData } from "../../schema/experiences";
import ExperienceCard from "../../components/admin/ExperienceCard";
import ExperienceForm from "../../components/admin/ExperienceForm";

const AdminExperiences = () => {
  const { data: experiences = [], isLoading } = useExperiences();
  const { mutate: deleteExperience, isPending } = useDeleteExperience();

  const [editing, setEditing] = useState<ExperienceFormData | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  
  const openCreate = () => {
    setEditing(null);
    setFormMode("create");
  };
  
  const openEdit = (experience: ExperienceFormData) => {
    setEditing(experience);
    setFormMode("edit");
  };
  
  const closeModal = () => {
    setEditing(null);
    setFormMode(null);
  };
  
  if (isLoading) return <p className="subheading p-4">Loading...</p>;

  return (
    <div className="container-custom section space-y-6 bg-background text-content min-h-screen">
      {/* Header */}
      <div className="flex-between items-center mb-10">
        <h1 className="heading text-3xl font-bold">
          Experiences 
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Experience 
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            company={experience.company}
            role={experience.role}
            duration={experience.duration}
            description={experience.description}
            isDeleting={isPending}
            onEdit={() => openEdit(experience)}
            onDelete={() => deleteExperience(experience.id)}
          />
        ))}
      </div>

      {/* Modal */}
      {formMode && (
        <div className="container-custom">
          <ExperienceForm
            mode={formMode}
            onSuccess={() => closeModal()}
            experience={editing ?? undefined}
          />
        </div>
      )}
    </div>
  );
};

export default AdminExperiences;
