import { Types } from "mongoose";
import AppointmentModel from "./appointment.model";
import { IAppointment } from "./appointment.interface";

const isSlotAvailable = async (
  doctorId: Types.ObjectId,
  selectedDate: string,
  timeSlot: { start: string; end: string }
) => {
  const conflict = await AppointmentModel.findOne({
    doctorId,
    selectedDate,
    "timeSlot.start": timeSlot.start,
    "timeSlot.end": timeSlot.end,
    status: { $in: ["pending", "confirmed"] },
  });
  return !conflict;
};

const bookAppointment = async (appointmentData: IAppointment) => {
  const available = await isSlotAvailable(
    appointmentData.doctorId,
    appointmentData.selectedDate,
    appointmentData.timeSlot
  );

  if (!available) throw new Error("Selected time slot is already booked.");

  const appointment = new AppointmentModel(appointmentData);
  return await appointment.save();
};

const getPatientAppointments = async (patientId: Types.ObjectId) => {
  return await AppointmentModel.find({ patientId });
};

export const AppointmentService = {
  bookAppointment,
  getPatientAppointments,
};