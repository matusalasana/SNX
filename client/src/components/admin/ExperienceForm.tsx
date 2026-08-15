import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateExperience,
  useUpdateExperience
} from "../../hooks/experiences";
import {
  createExperienceSchema,
  updateExperienceSchema,
  type UpdateExperienceInput,
  type CreateExperienceInput,
  type ExperienceFormData
} from "../../schema/experiences";

type Props = {
  mode: "create" | "edit";
  experience?: ExperienceFormData  & { id?: string; };
  onSuccess?: () => void;
};

export default function ExperienceForm({ mode, experience, onSuccess }: Props) {
  
  const { mutate: createExperience, isPending: creating } = useCreateExperience();
  const { mutate: updateExperience, isPending: updating } = useUpdateExperience();
  
  const schemaToApply = mode === "create"
    ? createExperienceSchema
    : updateExperienceSchema
  
  const isPending = creating || updating;
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(schemaToApply),
    values: mode === "edit" && experience 
      ? (experience as ExperienceFormData) 
      : undefined,
  });

  const onSubmit = (data: ExperienceFormData) => {
    
    if (mode === "create") {
      createExperience(data, {
        onSuccess: () => {
          onSuccess?.()
          reset()
        }
      });
    } else if(skill && mode === "edit"){
      updateExperience(
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
          {mode === "create" ? "Create Experience" : "Edit Experience"}
        </h2>

        <div>
          <label className="label">Company</label>
          <input {...register("company")} placeholder="eg. (NodeJs, ReactJs, ...)" className="input" />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
        </div>

        <div>
          <label className="label">Your Role</label>
          <input {...register("role")} placeholder="eg. (NodeJs, ReactJs, ...)" className="input" />
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
        </div>

        <div>
          <label className="label">Duration</label>
          <input {...register("duration")} placeholder="duration" className="input" />
          {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
        </div>
        
        <div>
          <label className="label">Description</label>
          <textarea {...register("description")} placeholder="duration" className="textarea" />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
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