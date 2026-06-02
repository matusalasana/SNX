import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long').regex(/^[a-z0-9-]+$/, 'Slug must consist of lowercase alphanumeric characters and hyphens only'),
  content: z.string().min(10, 'Content body must be at least 10 characters long'),
  summary: z.string().min(5, 'Summary must be at least 5 characters long'),
  thumbnail_url: z.string().url('Thumbnail must be a valid URL').or(z.string().length(0)).optional(),
  status: z.enum(['draft', 'published']).default('draft')
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
