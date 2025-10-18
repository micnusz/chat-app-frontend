import { z } from "zod";

export const chatRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters long.")
    .max(50, "Room name cannot exceed 50 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed."
    )
    .trim(),
  password: z
    .string()
    .max(100, "Password cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),
});
