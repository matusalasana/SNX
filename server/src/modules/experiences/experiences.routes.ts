import { Router } from 'express';
import { ExperiencesController } from './experiences.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', ExperiencesController.getExperiences);
router.post('/', requireAuth, ExperiencesController.createExperience);
router.delete('/:id', requireAuth, ExperiencesController.deleteExperience);

export default router;
