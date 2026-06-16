import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),

  tags: z.array(z.string()).default([]),

  description: z.string().min(5),

  thumbnailUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  githubUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  order: z.number().int().optional().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;