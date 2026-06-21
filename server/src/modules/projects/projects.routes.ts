import { Router } from 'express';
import { ProjectsController } from './projects.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { upload } from "../../middleware/upload.middleware";
import { validate } from '../../middleware/validation.middleware';
import { updateProjectSchema, createProjectSchema } from "./projects.validation"

const router = Router();

// Public routes
router.get('/', ProjectsController.getProjects);
router.get('/:id', ProjectsController.getProjectById);

// Admin-only protected routes
router.post(
  '/', 
  requireAuth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ProjectsController.createProject
);
router.patch('/:id', validate(updateProjectSchema), requireAuth, ProjectsController.updateProject);
router.delete('/:id', requireAuth, ProjectsController.deleteProject);

export default router;
