import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3),

  content: z.string().min(10),

  summary: z.string().min(5),

  thumbnailUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  status: z
    .enum(["draft", "published"])
    .default("draft"),

  readTime: z.string().min(1),

  author: z.string().min(1),

  tags: z.array(z.string()).default([]),

  category: z.string().optional(),

  featured: z.boolean().default(false),
});

export const updateBlogSchema =
  createBlogSchema.partial();

export type CreateBlogInput =
  z.infer<typeof createBlogSchema>;

export type UpdateBlogInput =
  z.infer<typeof updateBlogSchema>;