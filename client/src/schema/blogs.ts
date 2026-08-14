import { z } from "zod";


export const createBlogSchema = z.object({
  
  title: z.string().min(3, "Title is too short"),
  
  content: z.string().min(20, "Content is too short"),
  
  thumbnailUrl: z.string().optional(),
  
  status: z
    .enum(["draft", "published"])
    .default("draft"),
    
  readTime: z.string().min(1, "Read time is required"),
  
  tags: z.array(z.string()).default([]),
  
  category_id: z.uuid().min(1),
  
  featured: z.boolean().default(false),
});

export type BlogFormData = z.infer<typeof createBlogSchema>;

export const updateBlogSchema =
  createBlogSchema.partial();

export type CreateBlogInput =
  z.infer<typeof createBlogSchema>;

export type UpdateBlogInput =
  z.infer<typeof updateBlogSchema>;
  
export type BlogFormData = CreateBlogInput | UpdateBlogInput;