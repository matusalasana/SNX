import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  summary: z.string().min(10, "Summary is too short"),
  content: z.string().min(20, "Content is too short"),
  category: z.string().min(2, "Category is required"),
  readTime: z.string().min(1, "Read time is required"),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["published", "draft"]).optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;