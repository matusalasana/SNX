import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  useSkills,
  useDeleteSkill
} from "../../hooks/skills";
import SkillForm from "../../components/admin/SkillForm";
import SkillCard from "../../components/admin/SkillCard";
import { type SkillFormData }  from "../../schema/skills";
import { Skeleton }  from "../../utils/skeleton";

const AdminSkills = () => {
  
  const { data: skills = [], isLoading } = useSkills();
  const { mutate: deleteSkill, isPending } = useDeleteSkill();

  const [editingSkill, setEditingSkill] = useState<SkillFormData | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  
  const openCreate = () => {
    setEditingSkill(null);
    setFormMode("create");
  };
  
  const openEdit = (skill: SkillFormData) => {
    setEditingSkill(skill);
    setFormMode("edit");
  };
  
  const closeModal = () => {
    setEditingSkill(null);
    setFormMode(null);
  };

  if (isLoading) {
    return (
      <div className="container-custom section space-y-6 bg-background text-content min-h-screen">
  
        {/* Header skeleton */}
        <div className="flex-between flex-col sm:flex-row gap-3">
          <Skeleton className="skeleton h-8 w-40" />
          <Skeleton className="skeleton h-10 w-28 rounded-lg" />
        </div>
  
        {/* Table skeleton */}
        <div className="card border-border overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
  
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">
                    <Skeleton className="skeleton h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="skeleton h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="skeleton h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="skeleton h-4 w-20" />
                  </th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-border">
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-3">
                      <Skeleton className="skeleton h-4 w-40" />
                    </td>
  
                    <td className="p-3">
                      <Skeleton className="skeleton h-4 w-28" />
                    </td>
  
                    <td className="p-3">
                      <Skeleton className="skeleton h-6 w-16 rounded-md" />
                    </td>
  
                    <td className="p-3 flex gap-3">
                      <Skeleton className="skeleton h-4 w-12" />
                      <Skeleton className="skeleton h-4 w-12" />
                    </td>
                  </tr>
                ))}
              </tbody>
  
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom section space-y-6 bg-background text-content min-h-screen">

      {/* Header */}
      <div className="flex-between items-center mb-10">
        <h1 className="heading text-3xl font-bold">
          Skills 
        </h1>

        <button
          onClick={openCreate}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Skill 
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            name={skill.name}
            category={skill.category}
            isDeleting={isPending}
            proficiency={skill.proficiency}
            onEdit={() => openEdit(skill)}
            onDelete={() => deleteSkill(skill.id)}
          />
        ))}
      </div>

      {/* Modal */}
      {formMode && (
        <SkillForm 
          mode={formMode}
          skill={editingSkill ?? undefined}
          onSuccess={() => closeModal()} 
        />
      )}


    </div>
  );
};

export default AdminSkills;
