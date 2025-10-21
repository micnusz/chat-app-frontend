import { z } from "zod";

export const chatRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters long.")
    .max(35, "Room name cannot exceed 35 characters.")
    .regex(
      /^[a-zA-Z0-9 _-]+$/,
      "Room name can contain letters, numbers, spaces, underscores, and hyphens."
    )
    .transform((val) => val.trim()),
  password: z
    .string()
    .max(50, "Password cannot exceed 50 characters.")
    .optional()
    .or(z.literal("")),
});
