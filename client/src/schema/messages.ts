import { z } from "zod"; 

const messageSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(5, "Message must be at least well 5 characters"),
});

export type MessageData = z.infer<typeof messageSchema>