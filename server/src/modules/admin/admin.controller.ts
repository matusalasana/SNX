import {
  Request,
  Response,
} from "express";

import { AdminService } from "./admin.service";

const getAllBlogs = async (
  req: Request,
  res: Response
) => {
  try {
    const filters = {}

    const blogs = 
      await AdminService.getAllBlogs(filters);

    res.status(200).json(blogs);
  } catch (err: any) {
    console.log(`${req.method}: ${req.path} error: ${err.cause || err.message}`);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const AdminController = {
  getAllBlogs,
};