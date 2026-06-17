import { Router } from "express";

import { ExperiencesController }
from "./experiences.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createExperienceSchema,
} from "./experiences.validation";

const router = Router();

router.get(
  "/",
  ExperiencesController.getExperiences
);

router.post(
  "/",
  requireAuth,
  validate(createExperienceSchema),
  ExperiencesController.createExperience
);

router.delete(
  "/:id",
  requireAuth,
  ExperiencesController.deleteExperience
);

export default router;