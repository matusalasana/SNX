import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email().trim(),
  password_hash: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password_hash: z.string().min(8, "Password must be al least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;