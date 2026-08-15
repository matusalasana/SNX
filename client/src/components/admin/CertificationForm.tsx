import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateCertification,
  useUpdateCertification
} from "../../hooks/certifications";
import {
  createCertificationSchema,
  updateCertificationSchema,
  type UpdateCertificationInput,
  type CreateCertificationInput,
  type CertificationFormData
} from "../../schema/certifications";

type Props = {
  mode: "create" | "edit";
  certification?: CertificationFormData  & { id?: string; };
  onSuccess?: () => void;
};

export default function CertificationForm({ mode, certification, onSuccess }: Props) {
  
  const { mutate: createCertification, isPending: creating } = useCreateCertification();
  const { mutate: updateCertification, isPending: updating } = useUpdateCertification();
  
  const schemaToApply = mode === "create"
    ? createCertificationSchema
    : updateCertificationSchema
  
  const isPending = creating || updating;
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(schemaToApply),
    values: mode === "edit" && certification 
      ? (certification as CertificationFormData) 
      : undefined,
  });

  const onSubmit = (data: CertificationFormData) => {
    
    if (mode === "create") {
      createCertification(data, {
        onSuccess: () => {
          onSuccess?.()
          reset()
        }
      });
    } else if(certification && mode === "edit"){
      updateCertification(
        { id: certification.id, data },
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
          {mode === "create" ? "Create Certification" : "Edit Certification"}
        </h2>

        <div>
          <label className="label">Name</label>
          <input {...register("name")} placeholder="eg. Meta Backed Developer" className="input" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label">Issuer</label>
          <input {...register("issuer")} placeholder="eg. (NodeJs, ReactJs, ...)" className="input" />
          {errors.issuer && <p className="mt-1 text-xs text-red-500">{errors.issuer.message}</p>}
        </div>

        <div>
          <label className="label">Issued Date</label>
          <input {...register("issueDate")} className="input" type="month"/>
          {errors.issueDate && <p className="mt-1 text-xs text-red-500">{errors.issueDate.message}</p>}
        </div>
        
        <div>
          <label className="label">Credential ID</label>
          <input {...register("credentialId")} className="input"/>
          {errors.credentialId && <p className="mt-1 text-xs text-red-500">{errors.credentialId.message}</p>}
        </div>
        
        <div>
          <label className="label">Credential URL</label>
          <input {...register("credentialUrl")} className="input"/>
          {errors.credentialUrl && <p className="mt-1 text-xs text-red-500">{errors.credentialUrl.message}</p>}
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