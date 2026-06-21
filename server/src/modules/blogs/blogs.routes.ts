import { Router } from "express";

import { BlogsController }
from "./blogs.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { upload }
from "../../middleware/upload.middleware";

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
  upload.single("thumbnail"),
  BlogsController.createBlog
);

router.patch(
  "/:id",
  requireAuth,
  upload.single("thumbnail"),
  BlogsController.updateBlog
);

router.delete(
  "/:id",
  requireAuth,
  BlogsController.deleteBlog
);

export default router;