import { BlogsRepository } from "./blogs.repository";
import { uploadToCloudinary } from "../../utils/cloudinary"
import { createBlogSchema, updateBlogSchema } from "./blogs.validation"

import {
  CreateBlogInput,
  UpdateBlogInput,
} from "./blogs.validation";

export type BlogFilters = {
  featured?: boolean;
  category?: string;
};

const getBlogs = async (filters: BlogFilters) => {
  return await BlogsRepository.getBlogs(filters);
};

const getBlogById = async (id: string) => {
  if(!id) throw new Error("Id is not provided");
  
  const blog = await BlogsRepository.getBlogById(id);

  if (!blog) throw new Error("Blog post not found");

  return blog;
};

const createBlog = async ({
  thumbnail_buffer,
  validated
}) => {
  const {
    title,
    content,
    readTime,
    category_id,
    tags,
    status,
    featured
  } = validated;
  
  if(!thumbnail_buffer) throw new Error("Blog thumbnail is required");
  
  const uploadResult = await uploadToCloudinary(
    thumbnail_buffer,
    `blogs/thumbnails`
  )
  
  return await BlogsRepository.createBlog({
    title,
    content,
    status,
    readTime,
    categoryId: category_id,
    featured,
    tags,
    thumbnailUrl: uploadResult.secure_url
  });
};

const updateBlog = async ({
  id,
  validated
}) => {
  if(!validated){
    throw new Error("Body data not found");
  }
  
  const {
    title,
    content,
    readTime,
    category_id,
    tags,
    status,
    featured
  } = validated;
  
  const exists = await BlogsRepository.getBlogById(id);

  if (!exists) throw new Error("Blog post not found");
  
  const dataToUpdate = {};
  
  if(title !== undefined){
    dataToUpdate.title=title
  }
  
  if(content !== undefined){
    dataToUpdate.content=content
  }
  
  if(readTime !== undefined){
    dataToUpdate.readTime=readTime
  }
  
  if(category_id !== undefined){
    dataToUpdate.categoryId=category_id
  }
  
  if(status !== undefined){
    dataToUpdate.status=status
  }
  
  if(featured !== undefined){
    dataToUpdate.featured=featured
  }
  
  if(tags.length > 0){
    dataToUpdate.tags=tags
  }
  
  if (tags && Array.isArray(tags)) {
    dataToUpdate.tags = tags;
  }
  
  return BlogsRepository.update({
    id,
    data: dataToUpdate
  });
};

const updateThumbnail = async ({
  id,
  thumbnail_buffer
}) => {
  const existing = await BlogsRepository.getBlogById(id);

  if (!existing) throw new Error("Blog post not found");

  if (!thumbnail_buffer) throw new Error("Thumbnail buffer is missing");

  const uploadResult = await uploadToCloudinary(
    thumbnail_buffer,
    `blogs/thumbnails`
  );

  return BlogsRepository.updateThumbnail({
    id,
    thumbnailUrl: uploadResult.secure_url,
  });
};

const deleteBlog = async (
  id: string
) => {
  const existing =
    await BlogsRepository.getBlogById(id);

  if (!existing)
    throw new Error(
      "Blog post not found"
    );

  return BlogsRepository.deleteOne(id);
};

export const BlogsService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  updateThumbnail,
  deleteBlog,
};