import { z } from "zod";

export const createMessageSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email(
    "Valid email address is required"
  ),

  subject: z.string().min(
    3,
    "Subject line is required"
  ),

  message: z.string().min(
    5,
    "Message text is required"
  ),
});

export const updateMessageSchema =
  z.object({
    isRead: z.boolean(),
  });

export type CreateMessageInput =
  z.infer<typeof createMessageSchema>;

export type UpdateMessageInput =
  z.infer<typeof updateMessageSchema>;