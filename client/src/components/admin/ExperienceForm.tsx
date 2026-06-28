import { useEffect, useState } from "react";
import { useCreateExperience } from "../../hooks/experiences/useCreateExperience";
import { useUpdateExperience } from "../../hooks/experiences/useUpdateExperience";

type Props = {
  mode: "create" | "edit";
  experience?: any;
  onClose: () => void;
};

export default function ExperienceForm({
  mode,
  experience,
  onClose,
}: Props) {
  const { mutate: createExperience } = useCreateExperience();
  const { mutate: updateExperience } = useUpdateExperience();

  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    if (experience) {
      setForm({
        company: experience.company,
        role: experience.role,
        description: experience.description || "",
        duration: experience.duration,
      });
    }
  }, [experience]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      createExperience(form, { onSuccess: onClose });
    } else {
      updateExperience(
        { id: experience.id, ...form },
        { onSuccess: onClose }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-[420px] space-y-3"
      >
        <h2 className="text-lg font-bold">
          {mode === "create"
            ? "Add Experience"
            : "Edit Experience"}
        </h2>

        <input
          className="w-full border p-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />

        <input
          className="w-full border p-2"
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        <input
          className="w-full border p-2"
          placeholder="Duration (e.g. 2022 - 2024)"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
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