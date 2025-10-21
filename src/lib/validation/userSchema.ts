import z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username cannot exceed 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed."
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(20, "Password cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.<>?/]+$/,
      "Password can contain letters, numbers, and special characters."
    ),
});
