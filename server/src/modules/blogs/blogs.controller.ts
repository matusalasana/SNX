import {
  Request,
  Response,
} from "express";

import { BlogsService }
from "./blogs.service";

const getBlogs = async (
  req: Request,
  res: Response
) => {
  try {
    const includeDrafts =
      req.query.admin === "true";

    const blogs =
      await BlogsService.getAllBlogs(
        includeDrafts
      );

    res.status(200).json(blogs);
  } catch (err: any) {
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
    const blog =
      await BlogsService.getBlogById(
        req.params.id
      );

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
    const blog =
      await BlogsService.createNewBlog(
        req.body
      );

    res.status(201).json(blog);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateBlog = async (
  req: Request,
  res: Response
) => {
  try {
    const blog =
      await BlogsService.updateBlog(
        req.params.id,
        req.body
      );

    res.status(200).json(blog);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteBlog = async (
  req: Request,
  res: Response
) => {
  try {
    await BlogsService.deleteBlog(
      req.params.id
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
  deleteBlog,
};