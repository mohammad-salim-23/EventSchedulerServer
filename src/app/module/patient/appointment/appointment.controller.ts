import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import mongoose from "mongoose";
import { AppointmentService } from "./appointment.service";
import { sendResponse } from "../../../utils/sendResponse";
import { format, parseISO } from "date-fns"; // install: npm i date-fns

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");

  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const {
    doctorId,
    selectedDate,
    timeSlot,
    doctorUsername,
    doctorEmail,
    serviceId,
    serviceTitle,
  } = req.body;

  // 🔸 Extract day from selectedDate
  const day = format(parseISO(selectedDate), "EEEE"); // result: "Monday", "Tuesday", etc.

  const appointment = await AppointmentService.bookAppointment({
    doctorId: new mongoose.Types.ObjectId(doctorId),
    doctorUsername,
    doctorEmail,

    patientId: userId,
    patientUsername: req.user.username ?? (() => { throw new Error("Patient username missing"); })(),
    patientEmail: req.user.email ?? (() => { throw new Error("Patient email missing"); })(),

    selectedDate,
    day, // set day automatically
    timeSlot,

    serviceId,
    serviceTitle,
  });

  sendResponse(res, {
    success: true,
    message: "Appointment booked successfully",
    data: appointment,
    statusCode: 201,
  });
});



const getPatientAppointments = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");

  const patientId = new mongoose.Types.ObjectId(req.user.userId);
  const appointments = await AppointmentService.getPatientAppointments(patientId);

  sendResponse(res, {
    success: true,
    message: "Patient appointments fetched",
    data: appointments,
    statusCode: 200,
  });
});

export const AppointmentController = {
  bookAppointment,
  getPatientAppointments,
};
