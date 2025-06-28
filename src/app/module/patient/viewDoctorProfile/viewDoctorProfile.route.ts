
import express from "express";
import { PublicDoctorController } from "./viewDoctorProfile.controller";


const router = express.Router();

// GET /api/doctors - Browse doctors with optional filters
router.get("/", PublicDoctorController.getAllDoctors);

// GET /api/doctors/:id - View doctor profile by _id
router.get("/:id", PublicDoctorController.getDoctorById);

export const PublicDOctorRoutes = router;
