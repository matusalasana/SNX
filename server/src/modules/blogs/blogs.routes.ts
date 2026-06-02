import { Router } from 'express';
import { BlogsController } from './blogs.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', BlogsController.getBlogs);
router.get('/slug/:slug', BlogsController.getBlogBySlug);
router.get('/:id', BlogsController.getBlogById);

// Admin-only protected routes
router.post('/', requireAuth, BlogsController.createBlog);
router.put('/:id', requireAuth, BlogsController.updateBlog);
router.delete('/:id', requireAuth, BlogsController.deleteBlog);

export default router;
