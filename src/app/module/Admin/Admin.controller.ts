import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import User from "../user/user.model";
import AppointmentModel from "../patient/appointment/appointment.model";
import { sendResponse } from "../../utils/sendResponse";

// Admin Dashboard Summary

const getAdminDashboardSummary = catchAsync(async (req: Request, res: Response) => {
  const totalDoctors = await User.countDocuments({ role: 'doctor' });
  const totalPatients = await User.countDocuments({ role: 'patient' });
  const totalAppointments = await AppointmentModel.countDocuments();

  sendResponse(res, {
    success: true,
    message: 'Admin summary fetched successfully',
    data: { totalDoctors, totalPatients, totalAppointments },
    statusCode: 200
  });
});



export const AdminController={
    getAdminDashboardSummary 
}