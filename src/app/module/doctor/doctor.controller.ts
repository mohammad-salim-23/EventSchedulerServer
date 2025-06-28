import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";


// You can extend Express Request to include user in your types elsewhere

const addService = catchAsync(async (req: Request, res: Response) => {
  
  if (!req.user || !req.user.userId) {
    throw new Error("Unauthorized: User information is missing.");
  }
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const service = req.body;

  const services = await DoctorServices.addService(userId, service);
  sendResponse(res, {
    success: true,
    message: "Service added",
    data: services,
    statusCode: 201,
  });
});

const editService = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
    throw new Error("Unauthorized: User information is missing.");
  }
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const serviceId = req.params.id;
  const updatedService = req.body;

  const service = await DoctorServices.editService(userId, serviceId, updatedService);
  sendResponse(res, {
    success: true,
    message: "Service updated",
    data: service,
    statusCode: 200,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
    throw new Error("Unauthorized: User information is missing.");
  }
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const serviceId = req.params.id;

  await DoctorServices.deleteService(userId, serviceId);
  sendResponse(res, {
    success: true,
    message: "Service deleted",
    data: null,
    statusCode: 200,
  });
});

const setAvailability = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
    throw new Error("Unauthorized: User information is missing.");
  }
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  const availability = req.body;

  const updatedAvailability = await DoctorServices.setAvailability(userId, availability);
  sendResponse(res, {
    success: true,
    message: "Availability updated",
    data: updatedAvailability,
    statusCode: 200,
  });
});

const getAvailability = catchAsync(async (req: Request, res: Response) => {
  if (!req.user || !req.user.userId) {
    throw new Error("Unauthorized: User information is missing.");
  }
  const userId = new mongoose.Types.ObjectId(req.user.userId);

  const availability = await DoctorServices.getAvailability(userId);
  sendResponse(res, {
    success: true,
    message: "Availability fetched",
    data: availability,
    statusCode: 200,
  });
});

export const DoctorController = {
  addService,
  editService,
  deleteService,
  setAvailability,
  getAvailability,
};
