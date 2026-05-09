import { z } from "zod";

export const teamCreateSchema = z.object({
  name: z.string().min(2).trim(),
  tag: z.string().min(2).max(8).trim(),
  primaryGame: z.string().min(2).trim(),
  description: z.string().optional(),
});
