import { z } from "zod";

export const tournamentCreateSchema = z.object({
  name: z.string().min(3).trim(),
  game: z.string().min(2).trim(),
  format: z.enum(["single_elimination", "double_elimination", "round_robin"]),
  maxTeams: z.coerce.number().int().min(2).max(256),
  prizePool: z.coerce.number().min(0),
  entryFee: z.coerce.number().min(0),
  description: z.string().optional(),
});
