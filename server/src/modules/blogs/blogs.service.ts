import { BlogsRepository } from "./blogs.repository";
import { uploadToCloudinary } from "../../utils/cloudinary"
import { createBlogSchema } from "./blogs.validation"

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

const createNewBlog = async ({
  thumbnail_buffer,
  body
}) => {
  const validated = createBlogSchema.parse(body);
  const {
    title,
    content,
    summary,
    readTime,
    author="Sana Matusala",
    category,
    featured
  } = body;
  
  if(!thumbnail_buffer) throw new Error("Blog thumbnail is required");
  
  const uploadResult = await uploadToCloudinary(
    thumbnail_buffer,
    `blogs/thumbnails`
  )
  
  return await BlogsRepository.create({
    title,
    content,
    summary,
    readTime,
    author,
    category,
    featured,
    thumbnailUrl: uploadResult.secure_url
  });
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