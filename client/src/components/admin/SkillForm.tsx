import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateSkill,
  useUpdateSkill
} from "../../hooks/skills";
import { useCategories } from "../../hooks/categories/useCategories";
import {
  createSkillSchema,
  updateSkillSchema,
  type UpdateSkillInput,
  type CreateSkillInput,
  type SkillFormData
} from "../../schema/skills";

type Props = {
  mode: "create" | "edit";
  skill?: SkillFormData  & { id?: string; };
  onSuccess?: () => void;
};

export default function SkillForm({ mode, skill, onSuccess }: Props) {
  
  const { data: categories = [], isLoading} = useCategories();
  const { mutate: createSkill, isPending: creating } = useCreateSkill();
  const { mutate: updateSkill, isPending: updating } = useUpdateSkill();
  
  const [ isPreview, setIsPreview ] = useState(false);
  
  const schemaToApply = mode === "create"
    ? createSkillSchema
    : updateSkillSchema
  
  const isPending = creating || updating;
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(schemaToApply),
    values: mode === "edit" && skill 
      ? (skill as SkillFormData) 
      : undefined,
  });

  const onSubmit = (data: SkillFormData) => {
    
    if (mode === "create") {
      createSkill(data, {
        onSuccess: () => {
          onSuccess?.()
          reset()
        }
      });
    } else {
      updateSkill(
        { id: skill.id, data },
        { onSuccess: () => {
          onSuccess?.()
          reset()
        }}
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-[400px] space-y-3"
      >
        <h2 className="text-lg font-bold">
          {mode === "create" ? "Create Skill" : "Edit Skill"}
        </h2>

        <div>
          <label className="label">Name</label>
          <input {...register("name")} placeholder="eg. (NodeJs, ReactJs, ...)" className="input" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Category</label>
          <select className="input" disabled={isLoading} {...register("categoryId")}>
            <option value="">
              {isLoading ? "Loading..." : "Select category"}
            </option>
            {categories?.map((cat: string) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div>
          <label className="label">Proficiency</label>
          <input {...register("proficiency")} placeholder="Proficiency" className="input" />
          {errors.proficiency && <p className="mt-1 text-xs text-red-500">{errors.proficiency.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isPending}
            type="button"
            onClick={onSuccess}
            className="btn btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary">
            {mode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}