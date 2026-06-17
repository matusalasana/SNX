import { Router } from "express";

import { MessagesController }
from "./messages.controller";

import { requireAuth }
from "../../middleware/auth.middleware";

import { validate }
from "../../middleware/validation.middleware";

import {
  createMessageSchema,
  updateMessageSchema,
} from "./messages.validation";

const router = Router();

// Public contact form
router.post(
  "/",
  validate(createMessageSchema),
  MessagesController.createMessage
);

// Admin routes
router.get(
  "/",
  requireAuth,
  MessagesController.getMessages
);

router.patch(
  "/:id/read",
  requireAuth,
  validate(updateMessageSchema),
  MessagesController.markAsRead
);

router.delete(
  "/:id",
  requireAuth,
  MessagesController.deleteMessage
);

export default router;