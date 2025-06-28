import { z } from "zod";

export const doctorRegisterSchema = z.object({
  username: z.string(),
  password: z.string().min(8).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  email: z.string().email(),
  phone: z.string(),
  role: z.literal("doctor"),
  specialization: z.string(),
  hospitalName: z.string(),
  hospitalFloor: z.string(),
});

export const patientRegisterSchema = z.object({
  username: z.string(),
  password: z.string().min(8).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  email: z.string().email(),
  phone: z.string(),
  role: z.literal("patient"),
  age: z.number().min(0),
  gender: z.enum(["male", "female", "other"]),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
