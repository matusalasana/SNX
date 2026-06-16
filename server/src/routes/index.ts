import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
// import projectRoutes from '../modules/projects/projects.routes';
// import blogRoutes from '../modules/blogs/blogs.routes';
// import skillRoutes from '../modules/skills/skills.routes';
// import experienceRoutes from '../modules/experiences/experiences.routes';
// import messageRoutes from '../modules/messages/messages.routes';

const router = Router();

router.use('/auth', authRoutes);
// router.use('/projects', projectRoutes);
// router.use('/blogs', blogRoutes);
// router.use('/skills', skillRoutes);
// router.use('/experiences', experienceRoutes);
// router.use('/messages', messageRoutes);

export default router;
