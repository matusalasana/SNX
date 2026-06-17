import { Router } from "express";

import { BlogsController }
from "./blogs.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createBlogSchema,
  updateBlogSchema,
} from "./blogs.validation";

const router = Router();

router.get(
  "/",
  BlogsController.getBlogs
);

router.get(
  "/:id",
  BlogsController.getBlogById
);

router.post(
  "/",
  requireAuth,
  validate(createBlogSchema),
  BlogsController.createBlog
);

router.patch(
  "/:id",
  requireAuth,
  validate(updateBlogSchema),
  BlogsController.updateBlog
);

router.delete(
  "/:id",
  requireAuth,
  BlogsController.deleteBlog
);

export default router;