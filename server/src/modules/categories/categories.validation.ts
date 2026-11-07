import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(100),
});

export const categoryIdSchema = z.object({
  id: z.string().uuid(),
});

export type CreateCategoryInput =
  z.infer<typeof createCategorySchema>;

export type CategoryIdInput =
  z.infer<typeof categoryIdSchema>;