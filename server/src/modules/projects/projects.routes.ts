import { Router } from 'express';
import { ProjectsController } from './projects.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', ProjectsController.getProjects);
router.get('/:id', ProjectsController.getProjectById);

// Admin-only protected routes
router.post('/', requireAuth, ProjectsController.createProject);
router.patch('/:id', requireAuth, ProjectsController.updateProject);
router.delete('/:id', requireAuth, ProjectsController.deleteProject);

export default router;
