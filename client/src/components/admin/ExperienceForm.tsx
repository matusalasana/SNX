import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateExperience,
  useUpdateExperience,
} from "../../hooks/experiences";

import {
  createExperienceSchema,
  updateExperienceSchema,
  type ExperienceFormData,
} from "../../schema/experiences";

type Props = {
  mode: "create" | "edit";
  experience?: ExperienceFormData & { id?: string };
  onSuccess?: () => void;
};

export default function ExperienceForm({
  mode,
  experience,
  onSuccess,
}: Props) {
  const {
    mutate: createExperience,
    isPending: creating,
  } = useCreateExperience();

  const {
    mutate: updateExperience,
    isPending: updating,
  } = useUpdateExperience();

  const schemaToApply =
    mode === "create"
      ? createExperienceSchema
      : updateExperienceSchema;

  const isPending = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(schemaToApply),
    values:
      mode === "edit" && experience
        ? experience
        : undefined,
  });

  const onSubmit = (data: ExperienceFormData) => {
    if (mode === "create") {
      createExperience(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });

      return;
    }

    if (mode === "edit" && experience?.id) {
      updateExperience(
        {
          id: experience.id,
          data,
        },
        {
          onSuccess: () => {
            reset();
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-content/40 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        {/* Header */}
        <div className="mb-5">
          <h2 className="heading text-lg">
            {mode === "create"
              ? "Create Experience"
              : "Edit Experience"}
          </h2>

          <p className="mt-1 text-sm text-secondary">
            {mode === "create"
              ? "Add a new professional experience."
              : "Update your professional experience."}
          </p>
        </div>

        {/* Company */}
        <div>
          <label className="label">Company</label>

          <input
            {...register("company")}
            placeholder="e.g. Google"
            className="input"
          />

          {errors.company && (
            <p className="error-text mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="label">Your Role</label>

          <input
            {...register("role")}
            placeholder="e.g. Frontend Developer"
            className="input"
          />

          {errors.role && (
            <p className="error-text mt-1">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="label">Duration</label>

          <input
            {...register("duration")}
            placeholder="e.g. Jan 2025 - Jun 2026"
            className="input"
          />

          {errors.duration && (
            <p className="error-text mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>

          <textarea
            {...register("description")}
            placeholder="Describe your responsibilities and achievements..."
            rows={5}
            className="textarea"
          />

          {errors.description && (
            <p className="error-text mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
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
            className="btn btn-primary"
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