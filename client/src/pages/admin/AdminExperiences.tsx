import { useState } from "react";
import { useExperiences } from "../../hooks/experiences/useExperiences";
import { useDeleteExperience } from "../../hooks/experiences/useDeleteExperience";
import ExperienceForm from "../../components/admin/ExperienceForm";

const AdminExperiences = () => {
  const { data: experiences = [], isLoading } = useExperiences();
  const { mutate: deleteExperience } = useDeleteExperience();

  const [editing, setEditing] = useState<Experience | null>(null);
  const [creating, setCreating] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Experiences</h1>

        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Experience
        </button>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Company</th>
            <th>Role</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} className="border-b">
              <td className="p-2 font-medium">{exp.company}</td>
              <td>{exp.role}</td>
              <td>{exp.duration}</td>

              <td className="space-x-2">
                <button
                  onClick={() => setEditing(exp)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Modal */}
      {creating && (
        <ExperienceForm
          mode="create"
          onClose={() => setCreating(false)}
        />
      )}

      {/* Edit Modal */}
      {editing && (
        <ExperienceForm
          mode="edit"
          experience={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

export default AdminExperiences