
import { Types } from "mongoose";
import { IAvailabilitySlot, IService } from "./doctor.interface";
import DoctorModel from "./doctor.model";


// Add service
const addService = async (userId: Types.ObjectId, service: IService) => {
  const doctor = await DoctorModel.findOne({ userId });
  if (!doctor) throw new Error("Doctor profile not found");

  doctor.services.push(service);
  await doctor.save();
  return doctor.services;
};

// Edit service
const editService = async (
  userId: Types.ObjectId,
  serviceId: string,
  updatedService: Partial<IService>
) => {
  const doctor = await DoctorModel.findOne({ userId });
  if (!doctor) throw new Error("Doctor profile not found");

  const service = doctor.services.find((s: any) => s._id?.toString() === serviceId);
  if (!service) throw new Error("Service not found");

  Object.assign(service, updatedService);
  await doctor.save();
  return service;
};

// Delete service
const deleteService = async (userId: Types.ObjectId, serviceId: string) => {
  const doctor = await DoctorModel.findOne({ userId });
  if (!doctor) throw new Error("Doctor profile not found");

  const serviceIndex = doctor.services.findIndex((s: any) => s._id?.toString() === serviceId);
  if (serviceIndex === -1) throw new Error("Service not found");

  doctor.services.splice(serviceIndex, 1);
  await doctor.save();
  return true;
};

// Set availability (replace all)
const setAvailability = async (
  userId: Types.ObjectId,
  availability: IAvailabilitySlot[]
) => {
  const doctor = await DoctorModel.findOne({ userId });
  if (!doctor) throw new Error("Doctor profile not found");

  doctor.availability = availability;
  await doctor.save();
  return doctor.availability;
};

// Get availability
const getAvailability = async (userId: Types.ObjectId) => {
  const doctor = await DoctorModel.findOne({ userId });
  if (!doctor) throw new Error("Doctor profile not found");

  return doctor.availability;
};

export const DoctorServices = {
  addService,
  editService,
  deleteService,
  setAvailability,
  getAvailability,
};
