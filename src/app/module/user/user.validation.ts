import { z } from "zod";

export const registerValidationSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

  username: z.string({ required_error: "Username is required" }).min(1, "Username is required"),

  shopNames: z
    .array(z.string().min(1, "Shop name cannot be empty"))
    .min(3, "You must provide at least 3 shop names")
    .max(4, "You can provide at most 4 shop names"),
});
export const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1, "Username is required"),
  password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});