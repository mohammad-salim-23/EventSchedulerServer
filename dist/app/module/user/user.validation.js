"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.registerValidationSchema = void 0;
const zod_1 = require("zod");
exports.registerValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    username: zod_1.z.string({ required_error: "Username is required" }).min(1, "Username is required"),
    shopNames: zod_1.z
        .array(zod_1.z.string().min(1, "Shop name cannot be empty"))
        .min(3, "You must provide at least 3 shop names")
        .max(4, "You can provide at most 4 shop names"),
});
exports.loginValidationSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: "Username is required" }).min(1, "Username is required"),
    password: zod_1.z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
});
