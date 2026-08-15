import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import projectRoutes from '../modules/projects/projects.routes';
import blogRoutes from '../modules/blogs/blogs.routes';
import skillRoutes from '../modules/skills/skills.routes';
import experienceRoutes from '../modules/experiences/experiences.routes';
import messageRoutes from '../modules/messages/messages.routes';
import categoryRoutes from '../modules/categories/categories.routes';
import certificateRoutes from '../modules/certifications/certifications.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/categories', categoryRoutes);
router.use('/blogs', blogRoutes);
router.use('/skills', skillRoutes);
router.use('/experiences', experienceRoutes);
router.use('/messages', messageRoutes);
router.use('/certifications', certificateRoutes);

export default router;
