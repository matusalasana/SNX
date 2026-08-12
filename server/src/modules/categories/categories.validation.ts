import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
});

export const updateCategorySchema =
  createCategorySchema.partial();

export const categoryIdSchema = z.object({
  id: z.uuid(),
});

export type CreateCategoryInput =
  z.infer<typeof createCategorySchema>;

export type UpdateCategoryInput =
  z.infer<typeof updateCategorySchema>;

export type CategoryIdInput =
  z.infer<typeof categoryIdSchema>;