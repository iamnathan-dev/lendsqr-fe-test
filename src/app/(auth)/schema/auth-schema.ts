import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .regex(/.*[0-9].*/, {
      message: "Password must contain at least one number",
    })
    .regex(/.*[!@#$%^&*(),.?":{}|<>].*/, {
      message: "Password must contain at least one symbol",
    })
    .min(1, { message: "Password is required" }),
});
