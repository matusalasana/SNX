import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(2),

  category: z.enum([
    "frontend",
    "backend",
    "devops",
    "languages",
    "others",
  ]),

  proficiency: z.number().min(0).max(100),

  iconName: z.string().default("Code"),
});

export const updateSkillSchema =
  createSkillSchema.partial();

export type CreateSkillInput =
  z.infer<typeof createSkillSchema>;

export type UpdateSkillInput =
  z.infer<typeof updateSkillSchema>;