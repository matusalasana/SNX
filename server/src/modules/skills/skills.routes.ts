import { Router } from "express";

import { SkillsController }
from "./skills.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createSkillSchema,
  updateSkillSchema
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

router.patch(
  "/:id",
  requireAuth,
  validate(updateSkillSchema),
  SkillsController.updateSkill
);

router.delete(
  "/:id",
  requireAuth,
  SkillsController.deleteSkill
);

export default router;