// doctor.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import DoctorModel from "../../doctor/doctor.model";
import { sendResponse } from "../../../utils/sendResponse";


// Browse doctors with optional filters
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const { hospital, specialization, service } = req.query;

  // Build filter
  const filters: any = {};
  if (hospital) filters.hospital = hospital;
  if (specialization) filters.specialization = specialization;

  const doctors = await DoctorModel.find(filters);

  // Filter by service name if provided
  const filteredDoctors = service
    ? doctors.filter((doctor: any) =>
        doctor.services.some((s: any) =>
          s.title.toLowerCase().includes((service as string).toLowerCase())
        )
      )
    : doctors;

  sendResponse(res, {
    success: true,
    message: "Doctors fetched successfully",
    data: filteredDoctors,
    statusCode: 200,
  });
});

// Get single doctor profile by doctor _id (not userId)
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.id;

  const doctor = await DoctorModel.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  sendResponse(res, {
    success: true,
    message: "Doctor profile fetched",
    data: doctor,
    statusCode: 200,
  });
});

export const PublicDoctorController = {
  getAllDoctors,
  getDoctorById,
};
