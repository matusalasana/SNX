import { BlogsRepository } from "./blogs.repository";

import {
  CreateBlogInput,
  UpdateBlogInput,
} from "./blogs.validation";

const getAllBlogs = async (
  includeDrafts = false
) => {
  return BlogsRepository.findAll(
    includeDrafts
  );
};

const getBlogById = async (
  id: string
) => {
  const blog =
    await BlogsRepository.findById(id);

  if (!blog)
    throw new Error(
      "Blog post not found"
    );

  return blog;
};

const createNewBlog = async (
  data: CreateBlogInput
) => {
  return BlogsRepository.create(data);
};

const updateBlog = async (
  id: string,
  data: UpdateBlogInput
) => {
  const existing =
    await BlogsRepository.findById(id);

  if (!existing)
    throw new Error(
      "Blog post not found"
    );

  return BlogsRepository.update(
    id,
    data
  );
};

const deleteBlog = async (
  id: string
) => {
  const existing =
    await BlogsRepository.findById(id);

  if (!existing)
    throw new Error(
      "Blog post not found"
    );

  return BlogsRepository.deleteOne(id);
};

export const BlogsService = {
  getAllBlogs,
  getBlogById,
  createNewBlog,
  updateBlog,
  deleteBlog,
};