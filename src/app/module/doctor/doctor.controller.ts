import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import AppointmentModel from "../patient/appointment/appointment.model";

//add service
const addService = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) throw new Error("Unauthorized");
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const serviceData = req.body;

  const services = await DoctorServices.addService(userId, serviceData);
  sendResponse(res, {
    success: true,
    message: "Service added successfully",
    data: services,
    statusCode: 201,
  });
});
//edit service
const editService = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) throw new Error("Unauthorized");
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const serviceId = req.params.id;
  const updatedService = req.body;

  const service = await DoctorServices.editService(userId, serviceId, updatedService);
  sendResponse(res, {
    success: true,
    message: "Service updated successfully",
    data: service,
    statusCode: 200,
  });
});
 //delete service
const deleteService = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) throw new Error("Unauthorized");
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const serviceId = req.params.id;

  await DoctorServices.deleteService(userId, serviceId);
  sendResponse(res, {
    success: true,
    message: "Service deleted successfully",
    data: null,
    statusCode: 200,
  });
});

const setAvailability = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?.userId) throw new Error("Unauthorized");
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const availability = req.body;

  const updatedAvailability = await DoctorServices.setAvailability(userId, availability);
  sendResponse(res, {
    success: true,
    message: "Availability updated successfully",
    data: updatedAvailability,
    statusCode: 200,
  });
});

//doctor and patient relation
const getDoctorAppointments = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");
  const doctorId = new mongoose.Types.ObjectId(req.user.userId);
  const { status } = req.query;

  const filter: any = { doctorId };
  if (status) filter.status = status;

  const appointments = await AppointmentModel.find(filter);

  sendResponse(res, {
    success: true,
    message: "Doctor appointments fetched",
    data: appointments,
    statusCode: 200,
  });
});

// Update appointment status (accept, cancel, complete)
const updateAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) throw new Error("Unauthorized");
  const doctorId = new mongoose.Types.ObjectId(req.user.userId);
  const appointmentId = req.params.id;
  const { status } = req.body;

  const validStatuses = ["accepted", "cancelled", "completed"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const appointment = await AppointmentModel.findOne({ _id: appointmentId, doctorId });
  if (!appointment) throw new Error("Appointment not found");

  appointment.status = status;
  await appointment.save();

  sendResponse(res, {
    success: true,
    message: `Appointment ${status} successfully`,
    data: appointment,
    statusCode: 200,
  });
});

export const DoctorController = {
  addService,
  editService,
  deleteService,
  setAvailability,
   getDoctorAppointments,
   updateAppointmentStatus

};
