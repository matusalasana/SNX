import { Router } from "express";

import { SkillsController }
from "./skills.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createSkillSchema,
} from "./skills.validation";

const router = Router();

router.get(
  "/",
  SkillsController.getSkills
);

router.post(
  "/",
  requireAuth,
  validate(createSkillSchema),
  SkillsController.createSkill
);

router.delete(
  "/:id",
  requireAuth,
  SkillsController.deleteSkill
);

export default router;