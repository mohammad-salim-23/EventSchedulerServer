import { Types } from "mongoose";

export interface ITimeSlot {
  start: string; // e.g., "10:00"
  end: string;   // e.g., "10:30"
}

export interface IAppointment {
  _id?: Types.ObjectId;
  doctorId: Types.ObjectId;
  doctorUsername: string;
  doctorEmail: string;

  patientId: Types.ObjectId;
  patientUsername: string;
  patientEmail: string;

  selectedDate: string; // e.g., "2025-07-01"
  timeSlot: ITimeSlot;

  status?: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
