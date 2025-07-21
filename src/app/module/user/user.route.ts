import express from "express";

import { z } from "zod";
import catchAsync from "../../utils/catchAsync";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../utils/validateRequest";

const router = express.Router();
const registerSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

router.post(
  "/register",
  validateRequest(registerSchema),
  catchAsync(UserControllers.registerUser)
);
router.post(
  "/login",
  validateRequest(loginSchema),
  catchAsync(UserControllers.loginUser)
);
export const UserRoutes = router;