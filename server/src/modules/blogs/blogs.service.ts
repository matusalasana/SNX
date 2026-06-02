import { BlogsRepository } from './blogs.repository';
import { CreateBlogInput, UpdateBlogInput } from './blogs.validation';

const getAllBlogs = async (includeDrafts = false) => {
  return BlogsRepository.findAll(includeDrafts);
};

const getBlogBySlug = async (slug: string) => {
  const blog = await BlogsRepository.findBySlug(slug);
  if (!blog) throw new Error('Blog post not found matching this slug');
  return blog;
};

const getBlogById = async (id: string) => {
  const blog = await BlogsRepository.findById(id);
  if (!blog) throw new Error('Blog post not found matching this ID');
  return blog;
};

const createNewBlog = async (data: CreateBlogInput) => {
  // Check duplicate slug
  const existing = await BlogsRepository.findBySlug(data.slug);
  if (existing) {
    throw new Error('A blog post with this URL slug already exists. Use a unique slug.');
  }
  return BlogsRepository.create(data);
};

const updateBlog = async (id: string, data: UpdateBlogInput) => {
  const original = await BlogsRepository.findById(id);
  if (!original) throw new Error('Blog post to update not found');
  
  // Check duplicate slug ifChanged
  if (data.slug && data.slug !== original.slug) {
    const existing = await BlogsRepository.findBySlug(data.slug);
    if (existing) {
      throw new Error('A blog post with this URL slug already exists.');
    }
  }
  
  return BlogsRepository.update(id, data);
};

const deleteBlog = async (id: string) => {
  const success = await BlogsRepository.deleteOne(id);
  if (!success) throw new Error('Blog post to delete not found');
  return success;
};

export const BlogsService = {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createNewBlog,
  updateBlog,
  deleteBlog
};
