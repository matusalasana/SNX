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
        req.params.id as string
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
      await BlogsService.createNewBlog({
        thumbnail_buffer: req.file?.buffer,
        body: JSON.parse(req.body.data)
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
    const blog =
      await BlogsService.updateBlog(
        req.params.id as string,
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
  deleteBlog,
};