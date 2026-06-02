import { Router } from 'express';
import { SkillsController } from './skills.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', SkillsController.getSkills);
router.post('/', requireAuth, SkillsController.createSkill);
router.delete('/:id', requireAuth, SkillsController.deleteSkill);

export default router;
