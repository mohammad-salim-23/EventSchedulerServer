import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Zod schema for event validation
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  notes: z.string().optional(),
  archived: z.boolean().optional(),
  category: z.enum(["Work", "Personal", "Other"]).optional(),
});

export const validateEventInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    eventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      res.status(400).json({
        message: "Validation error",
        errors: formattedErrors,
      });
      return; 
    }
    next(error);
  }
};
