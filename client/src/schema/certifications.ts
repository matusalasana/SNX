import { z } from "zod";

export const createCertificationSchema = z.object({
  name: z
    .string()
    .min(1, "Certification name is required")
    .max(255),

  issuer: z
    .string()
    .min(1, "Issuer is required")
    .max(255),

  description: z
    .string()
    .optional(),

  issueDate: z
    .string()
    .min(1, "Issue date is required"),

  credentialId: z
    .string()
    .max(255)
    .optional(),

  credentialUrl: z
    .string()
    .url("Invalid credential URL")
    .optional(),
});

export const updateCertificationSchema =
  createCertificationSchema.partial();

export type CreateCertificationInput =
  z.infer<typeof createCertificationSchema>;

export type UpdateCertificationInput =
  z.infer<typeof updateCertificationSchema>;

export type CertificationFormData = CreateCertificationInput | UpdateCertificationInput