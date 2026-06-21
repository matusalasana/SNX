import { z } from "zod";


export const createBlogSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  summary: z.string().min(10, "Summary is too short"),
  content: z.string().min(20, "Content is too short"),
  thumbnailUrl: z.string().optional(),
  readTime: z.string().min(1, "Read time is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("draft"),
});

export type BlogFormData = z.infer<typeof createBlogSchema>;