import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message has to be at least 3 characters long.")
    .max(1000, "Message cannot exceed 1000 characters."),
});
