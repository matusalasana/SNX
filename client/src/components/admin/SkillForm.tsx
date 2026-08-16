import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateSkill, useUpdateSkill } from "../../hooks/skills";
import { useCategories } from "../../hooks/categories/useCategories";
import {
  createSkillSchema,
  updateSkillSchema,
  type SkillFormData,
} from "../../schema/skills";

type CategoryItem = {
  id: string;
  name: string;
};

type Props = {
  mode: "create" | "edit";
  skill?: SkillFormData & { id?: string };
  onSuccess?: () => void;
};

export default function SkillForm({ mode, skill, onSuccess }: Props) {
  const { data: categories = [], isLoading } = useCategories();
  const { mutate: createSkill, isPending: creating } = useCreateSkill();
  const { mutate: updateSkill, isPending: updating } = useUpdateSkill();

  const schemaToApply =
    mode === "create" ? createSkillSchema : updateSkillSchema;

  const isPending = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(schemaToApply),
    values: mode === "edit" && skill ? (skill as SkillFormData) : undefined,
  });

  const onSubmit = (data: SkillFormData) => {
    if (mode === "create") {
      createSkill(data, {
        onSuccess: () => {
          onSuccess?.();
          reset();
        },
      });
    } else if (skill && mode === "edit") {
      updateSkill(
        { id: skill.id, data },
        {
          onSuccess: () => {
            onSuccess?.();
            reset();
          },
        }
      );
    }
  };

  return (
    <div className="flex-center fixed inset-0 z-50 bg-content/30 p-4 backdrop-blur-xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md space-y-4"
      >
        <h2 className="heading text-lg">
          {mode === "create" ? "Create Skill" : "Edit Skill"}
        </h2>

        {/* NAME */}
        <div>
          <label className="label">Name</label>
          <input
            {...register("name")}
            placeholder="e.g. Node.js, React, TypeScript..."
            className="input"
          />
          {errors.name?.message && (
            <p className="error-text mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className="label">Category</label>
          <select
            className="input"
            disabled={isLoading}
            {...register("categoryId")}
          >
            <option value="">
              {isLoading ? "Loading categories..." : "Select category"}
            </option>
            {categories?.map((cat: CategoryItem) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && (
            <p className="error-text mt-1">{errors.categoryId.message}</p>
          )}
        </div>

        {/* PROFICIENCY */}
        <div>
          <label className="label">Proficiency</label>
          <input
            {...register("proficiency")}
            placeholder="Beginner, Intermediate, or Expert"
            className="input"
          />
          {errors.proficiency?.message && (
            <p className="error-text mt-1">{errors.proficiency.message}</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex-between pt-2">
          <button
            type="button"
            disabled={isPending}
            onClick={onSuccess}
            className="btn-outline"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
          >
            {isPending
              ? "Saving..."
              : mode === "create"
              ? "Create"
              : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
