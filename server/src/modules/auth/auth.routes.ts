import { Router } from 'express';

import { AuthController } from './auth.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validation.middleware';
import { loginSchema, registerSchema } from "./auth.validation"

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', requireAuth, AuthController.getMe);
router.post('/register', validate(registerSchema), AuthController.register);

export default router;
