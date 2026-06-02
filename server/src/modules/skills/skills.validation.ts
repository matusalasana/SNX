import { z } from 'zod';

export const createSkillSchema = z.object({
  name: z.string().min(2, 'Skill name is required'),
  category: z.enum(['frontend', 'backend', 'devops', 'languages', 'others']),
  proficiency: z.number().min(0).max(100, 'Proficiency must be between 0 and 100'),
  icon_name: z.string().optional().default('Code')
});

export const updateSkillSchema = createSkillSchema.partial();

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;
