import { Router } from 'express';
import { MessagesController } from './messages.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

// Public route to submit messages
router.post('/', MessagesController.createMessage);

// Protected admin routes to inspect and process recruiter messages
router.get('/', requireAuth, MessagesController.getMessages);
router.put('/:id/read', requireAuth, MessagesController.markAsRead);
router.delete('/:id', requireAuth, MessagesController.deleteMessage);

export default router;
