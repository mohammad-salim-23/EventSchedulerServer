import { Types } from "mongoose";
import AppointmentModel from "./appointment.model";
import DoctorModel from "../../doctor/doctor.model";
import { IAppointment } from "./appointment.interface";

// Utility to convert HH:MM to minutes
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

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

const isDoctorAvailableOnThatDayAndSlot = async (
  doctorId: Types.ObjectId,
  selectedDay: string,
  timeSlot: { start: string; end: string },
  serviceId: Types.ObjectId
) => {
  const doctor = await DoctorModel.findOne({ userId: doctorId });
  if (!doctor) throw new Error("Doctor not found");

  // Check availability day and slot
  const dayAvailability = doctor.availability.find((a: any) => a.day === selectedDay);
  if (!dayAvailability) return false;

  const slotMatch = dayAvailability.slots.some((slot: any) => {
    const slotStart = timeToMinutes(slot.start);
    const slotEnd = timeToMinutes(slot.end);
    const requestedStart = timeToMinutes(timeSlot.start);
    const requestedEnd = timeToMinutes(timeSlot.end);
    return requestedStart >= slotStart && requestedEnd <= slotEnd;
  });
  if (!slotMatch) return false;

  // Check if service exists and duration matches the requested slot
  const service = doctor.services.find((s: any) => s._id.toString() === serviceId.toString());
  if (!service) throw new Error("Service not found");

  const expectedDuration = service.duration;
  const actualDuration = timeToMinutes(timeSlot.end) - timeToMinutes(timeSlot.start);

  return actualDuration === expectedDuration;
};

const bookAppointment = async (appointmentData: IAppointment) => {
  const { doctorId, selectedDate, timeSlot, day, serviceId } = appointmentData;

  const availableOnDay = await isDoctorAvailableOnThatDayAndSlot(
    doctorId,
    day,
    timeSlot,
    serviceId
  );
  if (!availableOnDay) {
    throw new Error(`Doctor is not available on ${day} at selected time with valid duration.`);
  }

  const available = await isSlotAvailable(doctorId, selectedDate, timeSlot);
  if (!available) {
    throw new Error("Selected time slot is already booked.");
  }

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
