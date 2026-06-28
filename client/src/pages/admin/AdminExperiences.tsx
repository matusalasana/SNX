import { useState } from "react";
import { useExperiences } from "../../hooks/experiences/useExperiences";
import { useDeleteExperience } from "../../hooks/experiences/useDeleteExperience";
import ExperienceForm from "../../components/admin/ExperienceForm";

const AdminExperiences = () => {
  const { data: experiences = [], isLoading } = useExperiences();
  const { mutate: deleteExperience } = useDeleteExperience();

  const [editing, setEditing] = useState<Experience | null>(null);
  const [creating, setCreating] = useState(false);

  if (isLoading) return <p className="text-amber-600">Loading...</p>;

  return (
    <div className="p-4 space-y-4 bg-amber-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-900">
          Experiences
        </h1>

        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-amber-600 text-white rounded
                     hover:bg-amber-700 transition"
        >
          Add Experience
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-amber-200 bg-white rounded">
          <thead className="bg-amber-100 text-amber-900">
            <tr className="text-left">
              <th className="p-2">Company</th>
              <th>Role</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {experiences.map((exp) => (
              <tr
                key={exp.id}
                className="border-t border-amber-100 hover:bg-amber-50"
              >
                <td className="p-2 font-medium text-amber-900">
                  {exp.company}
                </td>

                <td className="text-amber-800">{exp.role}</td>

                <td className="text-amber-700">{exp.duration}</td>

                <td className="space-x-3">
                  <button
                    onClick={() => setEditing(exp)}
                    className="text-amber-600 hover:text-amber-800 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
};

export default AdminExperiences;