import { useState, useEffect } from "react";
import { useCreateSkill } from "../../hooks/skills/useCreateSkill";
import { useUpdateSkill } from "../../hooks/skills/useUpdateSkill";

type Props = {
  mode: "create" | "edit";
  skill?: any;
  onClose: () => void;
};

export default function SkillForm({ mode, skill, onClose }: Props) {
  const { mutate: createSkill } = useCreateSkill();
  const { mutate: updateSkill } = useUpdateSkill();

  const [form, setForm] = useState({
    name: "",
    category: "",
    proficiency: 0,
    iconName: "",
  });

  useEffect(() => {
    if (skill) {
      setForm({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        iconName: skill.iconName || "",
      });
    }
  }, [skill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      createSkill(form, { onSuccess: onClose });
    } else {
      updateSkill(
        { id: skill.id, ...form },
        { onSuccess: onClose }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-[400px] space-y-3"
      >
        <h2 className="text-lg font-bold">
          {mode === "create" ? "Create Skill" : "Edit Skill"}
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Category"
          className="w-full border p-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Proficiency (0-100)"
          className="w-full border p-2"
          value={form.proficiency}
          onChange={(e) =>
            setForm({
              ...form,
              proficiency: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Icon Name (optional)"
          className="w-full border p-2"
          value={form.iconName}
          onChange={(e) =>
            setForm({ ...form, iconName: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border"
          >
            Cancel
          </button>

          <button className="px-3 py-1 bg-black text-white">
            {mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}