import { Request, Response } from 'express';
import { BlogsService } from './blogs.service';
import { createBlogSchema, updateBlogSchema } from './blogs.validation';

const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const includeDrafts = req.query.admin === 'true';
    const list = await BlogsService.getAllBlogs(includeDrafts);
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await BlogsService.getBlogBySlug(slug);
    res.json(blog);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await BlogsService.getBlogById(id);
    res.json(blog);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = createBlogSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.format() });
      return;
    }
    const newBlog = await BlogsService.createNewBlog(result.data);
    res.status(201).json(newBlog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = updateBlogSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.format() });
      return;
    }
    const updated = await BlogsService.updateBlog(id, result.data);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await BlogsService.deleteBlog(id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const BlogsController = {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
