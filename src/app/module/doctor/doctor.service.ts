import mongoose, { Types } from "mongoose";
import DoctorModel from "./doctor.model";
import User from "../user/user.model";
import { IService, IAvailabilitySlot } from "./doctor.interface";

// Helper to get doctor info from User model
const getDoctorInfo = async (userId: Types.ObjectId) => {
  const doctor = await User.findOne({ _id: userId, role: "doctor" });
  if (!doctor) throw new Error("Doctor not found");
  return {
    doctorId: doctor._id,
    doctorUsername: doctor.username,
    doctorEmail: doctor.email,
  };
};

// Add Service
const addService = async (userId: Types.ObjectId, serviceData: Omit<IService, "doctorId" | "doctorUsername" | "doctorEmail">) => {
  const doctorInfo = await getDoctorInfo(userId);

  // Find existing doctor doc or create new
  let doctorDoc = await DoctorModel.findOne({ userId: doctorInfo.doctorId });
  if (!doctorDoc) {
    doctorDoc = new DoctorModel({ userId: doctorInfo.doctorId, services: [], availability: [] });
  }

  const newService = {
    ...serviceData,
    doctorId: new mongoose.Types.ObjectId(doctorInfo.doctorId),
    doctorUsername: doctorInfo.doctorUsername,
    doctorEmail: doctorInfo.doctorEmail,
  };

  doctorDoc.services.push(newService);
  await doctorDoc.save();
  return doctorDoc.services;
};

// Edit Service
const editService = async (
  userId: Types.ObjectId,
  serviceId: string,
  updatedService: Partial<IService>
) => {
  const doctorDoc = await DoctorModel.findOne({ userId });
  if (!doctorDoc) throw new Error("Doctor profile not found");

  const service = doctorDoc.services.find((s: any) => s._id?.toString() === serviceId);
  if (!service) throw new Error("Service not found");

  Object.assign(service, updatedService);
  await doctorDoc.save();

  return service;
};

// Delete Service
const deleteService = async (userId: Types.ObjectId, serviceId: string) => {
  const doctorDoc = await DoctorModel.findOne({ userId });
  if (!doctorDoc) throw new Error("Doctor profile not found");

  const serviceIndex = doctorDoc.services.findIndex((s: any) => s._id?.toString() === serviceId);
  if (serviceIndex === -1) throw new Error("Service not found");

  doctorDoc.services.splice(serviceIndex, 1);
  await doctorDoc.save();

  return true;
};

// Set Availability (replace all)
const setAvailability = async (userId: Types.ObjectId, availability: IAvailabilitySlot[]) => {
  const doctorInfo = await getDoctorInfo(userId);

  let doctorDoc = await DoctorModel.findOne({ userId: doctorInfo.doctorId });
  if (!doctorDoc) {
    doctorDoc = new DoctorModel({ userId: doctorInfo.doctorId, services: [], availability: [] });
  }

  const availabilityWithDoctorInfo = availability.map(slot => ({
    ...slot,
    doctorId: new mongoose.Types.ObjectId(doctorInfo.doctorId),
    doctorUsername: doctorInfo.doctorUsername,
    doctorEmail: doctorInfo.doctorEmail,
  }));

  doctorDoc.availability = availabilityWithDoctorInfo;
  await doctorDoc.save();

  return doctorDoc.availability;
};

// Get Availability
const getAvailability = async (userId: Types.ObjectId) => {
  const doctorDoc = await DoctorModel.findOne({ userId });
  if (!doctorDoc) throw new Error("Doctor profile not found");

  return doctorDoc.availability;
};

export const DoctorServices = {
  addService,
  editService,
  deleteService,
  setAvailability,
  getAvailability,
};
