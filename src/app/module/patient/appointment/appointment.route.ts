import express from "express";
import auth from "../../../middlewares/auth";
import { AppointmentController } from "./appointment.controller";
const router = express.Router();

// Book an appointment (only patients)
router.post("/appointments", auth("patient"), AppointmentController.bookAppointment);

// Get all appointments for the logged-in patient
router.get("/patient/appointments", auth("patient"), AppointmentController.getPatientAppointments);

export default router;