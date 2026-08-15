import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(2),

  categoryId: z.uuid(),

  proficiency: z.string().min(2),
});

export const updateSkillSchema =
  createSkillSchema.partial();

export type CreateSkillInput =
  z.infer<typeof createSkillSchema>;

export type UpdateSkillInput =
  z.infer<typeof updateSkillSchema>;
  
export type SkillFormData = CreateSkillInput | UpdateSkillInput;