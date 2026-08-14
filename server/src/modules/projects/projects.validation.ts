import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  
  category_id: z.uuid().min(1),

  tags: z.array(z.string()).default([]),
  
  content: z.string().min(20),
  
  thumbnailUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),
    
  featured: z.boolean().default(false),
  
  description: z.string().min(5),
  
  order: z.number().int().optional().default(0),

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
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;