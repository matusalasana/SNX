import {
  Request,
  Response,
} from "express";

import { BlogsService }
from "./blogs.service";
import { createBlogSchema, updateBlogSchema } from "./blogs.validation"

const getBlogs = async (req: Request, res: Response) => {
  try {
    
    const filters = {
      featured:
        req.query.featured !== undefined
          ? req.query.featured === "true"
          : undefined,

      category:
        req.query.category !== undefined
          ? req.query.category
          : undefined,
    };
    console.log("filter:", filters)

    const blogs = await BlogsService.getBlogs(filters);
    console.log("body:", blogs)

    res.status(200).json(blogs);
  } catch (err: any) {
    console.error(
      `${req.method}: ${req.path} error: ${err.cause || err.message}`,
    );

    res.status(500).json({
      error: err.message,
    });
  }
};

const getBlogById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    const blog = 
      await BlogsService.getBlogById(id);
    res.status(200).json(blog);
  } catch (err: any) {
    res.status(404).json({
      error: err.message,
    });
  }
};

const createBlog = async (
  req: Request,
  res: Response
) => {
  try {
    const thumbnail = req.file as any;
    
    const data = JSON.parse(req.body.data);
    
    const validated = createBlogSchema.parse(data);
    
    const blog = await BlogsService.createBlog({
        thumbnail_buffer: thumbnail?.buffer,
        validated,
      });

    res.status(201).json(blog);
    console.log(blog)
  } catch (err: any) {
    console.log(err.cause || err.message,)
    res.status(500).json({
      error: err.cause || err.message,
    });
  }
};

const updateBlog = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    console.log(req.body)
    const validated = updateBlogSchema.parse(req.body);
    
    const blog = await BlogsService.updateBlog({
      id,
      validated
    });

    res.status(200).json(blog);
  } catch (err: any) {
    console.log(err.cause || err.message,)
    res.status(500).json({
      error: err.cause || err.message,
    });
  }
};

const updateThumbnail = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;
    
    const blog = await BlogsService.updateThumbnail({
      id,
      thumbnail_buffer: req.file?.buffer
    });

    res.status(200).json(blog);
  } catch (err: any) {
    console.log(err.cause || err.message,)
    res.status(500).json({
      error: err.cause || err.message,
    });
  }
};

const deleteBlog = async (
  req: Request,
  res: Response
) => {
  try {
    await BlogsService.deleteBlog(
      req.params.id as string
    );

    res.json({
      message:
        "Blog deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const BlogsController = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  updateThumbnail,
  deleteBlog,
};