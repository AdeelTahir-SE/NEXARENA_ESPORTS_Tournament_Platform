import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim(),
  password: z.string().min(8, { error: "Password must be at least 8 characters." }),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, { error: "Full name is required." }).trim(),
  email: z.email({ error: "Enter a valid email address." }).trim(),
  password: z.string().min(8, { error: "Password must be at least 8 characters." }),
});
