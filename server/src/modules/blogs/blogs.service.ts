import { BlogsRepository } from "./blogs.repository";
import { uploadToCloudinary } from "../../utils/cloudinary"
import { createBlogSchema, updateBlogSchema } from "./blogs.validation"

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
    tags,
    status,
    featured
  } = validated;
  
  if(!thumbnail_buffer) throw new Error("Blog thumbnail is required");
  
  const uploadResult = await uploadToCloudinary(
    thumbnail_buffer,
    `blogs/thumbnails`
  )
  
  return await BlogsRepository.create({
    title,
    content,
    summary,
    status,
    readTime,
    author,
    category,
    featured,
    tags,
    thumbnailUrl: uploadResult.secure_url
  });
};

const updateBlog = async ({
  id,
  body,
  thumbnail_buffer
}) => {
  const validated = updateBlogSchema.parse(body);
  
  if(!validated){
    throw new Error("Body data not found");
  }
  
  const {
    title,
    content,
    summary,
    readTime,
    author="Sana Matusala",
    category,
    tags,
    status,
    featured
  } = validated;
  
  const exists = await BlogsRepository.findById(id);

  if (!exists) throw new Error("Blog post not found");

  let uploadResult;
  if(thumbnail_buffer){
    uploadResult = await uploadToCloudinary(
      thumbnail_buffer,
      `blogs/thumbnails`
    )
  }
  
  const dataToUpdate = {};
  
  if(uploadResult?.secure_url !== undefined){
    dataToUpdate.thumbnailUrl=uploadResult.secure_url
  }
  
  if(title !== undefined){
    dataToUpdate.title=title
  }
  
  if(content !== undefined){
    dataToUpdate.content=content
  }
  
  if(summary !== undefined){
    dataToUpdate.summary=summary
  }
  
  if(readTime !== undefined){
    dataToUpdate.readTime=readTime
  }
  
  if(author !== undefined){
    dataToUpdate.author=author
  }
  
  if(category !== undefined){
    dataToUpdate.category=category
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
  
  return BlogsRepository.update({
    id,
    data: dataToUpdate
  });
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