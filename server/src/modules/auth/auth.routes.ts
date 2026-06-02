import { Router } from 'express';
import { AuthController } from './auth.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', requireAuth, AuthController.getMe);
router.post('/register', AuthController.register);

export default router;
