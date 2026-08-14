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
  upload.single("thumbnail"),
  ProjectsController.createProject
);

router.patch('/:id', requireAuth, ProjectsController.updateProject);

router.post(
  '/:id/thumbnail', 
  requireAuth,
  upload.single("thumbnail"),
  ProjectsController.updateThumbnail);

router.delete(
  '/:id', 
  requireAuth,
  upload.single("thumbnail"),
  ProjectsController.deleteProject
);

export default router;
