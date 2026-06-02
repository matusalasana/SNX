import { z } from 'zod';

export const createExperienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  role: z.string().min(2, 'Role title is required'),
  description: z.string().min(5, 'Description is required'),
  duration: z.string().min(2, 'Duration is required') // e.g. "Jun 2024 - Present"
});

export const updateExperienceSchema = createExperienceSchema.partial();

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
