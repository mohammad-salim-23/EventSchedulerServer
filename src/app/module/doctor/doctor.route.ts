
import express, { RequestHandler } from "express";
import { DoctorController } from "./doctor.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

// Services
router.post("/services", auth(USER_ROLE.DOCTOR), DoctorController.addService );
router.patch("/services/:id",auth(USER_ROLE.DOCTOR), DoctorController.editService);
router.delete("/services/:id",auth(USER_ROLE.DOCTOR), DoctorController.deleteService);

// Availability
router.post("/availability",auth(USER_ROLE.DOCTOR), DoctorController.setAvailability);


// Doctor-side appointment management
router.get("/appointments", auth(USER_ROLE.DOCTOR), DoctorController.getDoctorAppointments);
router.patch("/appointments/:id/status", auth(USER_ROLE.DOCTOR), DoctorController.updateAppointmentStatus);
export const DoctorRoutes = router;
