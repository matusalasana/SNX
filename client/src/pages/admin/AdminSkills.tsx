import { useState } from "react";
import { useSkills } from "../../hooks/skills/useSkills";
import { useDeleteSkill } from "../../hooks/skills/useDeleteSkill";
import SkillForm from "../../components/admin/SkillForm";
import { Skeleton }  from "../../utils/skeleton";

const AdminSkills = () => {
  const { data: skills = [], isLoading } = useSkills();
  const { mutate: deleteSkill } = useDeleteSkill();

  const [editingSkill, setEditingSkill] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
  
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
  
        {/* Table skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
  
              <thead className="bg-amber-50 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="p-3 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                </tr>
              </thead>
  
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-3">
                      <Skeleton className="h-4 w-40" />
                    </td>
  
                    <td className="p-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
  
                    <td className="p-3">
                      <Skeleton className="h-6 w-16 rounded-md" />
                    </td>
  
                    <td className="p-3 flex gap-3">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
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
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skills
        </h1>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 rounded-lg
                     bg-amber-500 text-black font-semibold
                     hover:bg-amber-400 active:bg-amber-600
                     dark:bg-amber-400 dark:hover:bg-amber-300
                     transition shadow-sm"
        >
          + Add Skill
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead className="bg-amber-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="text-left p-3 font-semibold">Name</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-left p-3 font-semibold">Proficiency</th>
                <th className="text-left p-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

              {skills.map((skill) => (
                <tr
                  key={skill.id}
                  className="hover:bg-amber-50/40 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </td>

                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {skill.category}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded-md text-xs font-semibold
                                     bg-amber-100 text-amber-800
                                     dark:bg-amber-500/20 dark:text-amber-300">
                      {skill.proficiency}%
                    </span>
                  </td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="text-amber-600 dark:text-amber-400 font-medium hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="text-red-500 dark:text-red-400 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {skills.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    No skills found.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Create */}
      {isCreating && (
        <SkillForm mode="create" onClose={() => setIsCreating(false)} />
      )}

      {/* Edit */}
      {editingSkill && (
        <SkillForm
          mode="edit"
          skill={editingSkill}
          onClose={() => setEditingSkill(null)}
        />
      )}
    </div>
  );
};

export default AdminSkills;