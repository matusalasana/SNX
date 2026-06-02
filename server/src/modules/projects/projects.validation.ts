import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  content: z.string().optional().default(''),
  thumbnail_url: z.string().url('Thumbnail must be a valid URL').or(z.string().length(0)).optional(),
  github_url: z.string().url('Github Link must be a valid URL').or(z.string().length(0)).optional(),
  live_url: z.string().url('Live Link must be a valid URL').or(z.string().length(0)).optional(),
  order_index: z.number().int().optional().default(0)
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
