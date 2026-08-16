import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateCertification,
  useUpdateCertification,
} from "../../hooks/certifications";
import {
  createCertificationSchema,
  updateCertificationSchema,
  type CertificationFormData,
} from "../../schema/certifications";

type Props = {
  mode: "create" | "edit";
  certification?: CertificationFormData & { id?: string };
  onSuccess?: () => void;
};

export default function CertificationForm({
  mode,
  certification,
  onSuccess,
}: Props) {
  const {
    mutate: createCertification,
    isPending: creating,
  } = useCreateCertification();

  const {
    mutate: updateCertification,
    isPending: updating,
  } = useUpdateCertification();

  const schemaToApply =
    mode === "create"
      ? createCertificationSchema
      : updateCertificationSchema;

  const isPending = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(schemaToApply),
    values:
      mode === "edit" && certification
        ? certification
        : undefined,
  });

  const onSubmit = (data: CertificationFormData) => {
    if (mode === "create") {
      createCertification(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
      return;
    }

    if (mode === "edit" && certification?.id) {
      updateCertification(
        {
          id: certification.id,
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
        className="card w-full max-w-md space-y-4"
      >
        <div>
          <h2 className="heading text-lg">
            {mode === "create"
              ? "Create Certification"
              : "Edit Certification"}
          </h2>

          <p className="subheading mt-1 text-sm">
            {mode === "create"
              ? "Add a certification to your profile."
              : "Update your certification details."}
          </p>
        </div>

        <div>
          <label className="label">Name</label>
          <input
            {...register("name")}
            placeholder="e.g. Meta Front-End Developer"
            className="input"
            disabled={isPending}
          />
          {errors.name && (
            <p className="error-text mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Issuer</label>
          <input
            {...register("issuer")}
            placeholder="e.g. Meta"
            className="input"
            disabled={isPending}
          />
          {errors.issuer && (
            <p className="error-text mt-1">
              {errors.issuer.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Issued Date</label>
          <input
            {...register("issueDate")}
            type="month"
            className="input"
            disabled={isPending}
          />
          {errors.issueDate && (
            <p className="error-text mt-1">
              {errors.issueDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Credential ID</label>
          <input
            {...register("credentialId")}
            className="input"
            disabled={isPending}
          />
          {errors.credentialId && (
            <p className="error-text mt-1">
              {errors.credentialId.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Credential URL</label>
          <input
            {...register("credentialUrl")}
            type="url"
            placeholder="https://..."
            className="input"
            disabled={isPending}
          />
          {errors.credentialUrl && (
            <p className="error-text mt-1">
              {errors.credentialUrl.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description")}
            placeholder="Describe this certification..."
            className="textarea"
            disabled={isPending}
          />
          {errors.description && (
            <p className="error-text mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onSuccess}
            disabled={isPending}
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