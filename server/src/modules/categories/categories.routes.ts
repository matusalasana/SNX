import { Router } from "express";

import { CategoriesController }
from "./categories.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createCategorySchema,
  categoryIdSchema,
} from "./categories.validation";

const router = Router();

router.get(
  "/",
  CategoriesController.getCategories
);

router.post(
  "/",
  requireAuth,
  validate(createCategorySchema),
  CategoriesController.createCategory
);

router.delete(
  "/:id",
  requireAuth,
  CategoriesController.deleteCategory
);

export default router;