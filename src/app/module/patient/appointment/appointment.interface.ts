import { Types } from "mongoose";

export interface IAppointment {
  _id?: Types.ObjectId;
  doctorId: Types.ObjectId;
  doctorUsername: string;
  doctorEmail: string;
  serviceId: Types.ObjectId; // reference to specific service
  serviceTitle: string;
  day: string; // Derived from selectedDate (like Monday)

  patientId: Types.ObjectId;
  patientUsername: string;
  patientEmail: string;

  selectedDate: string; // e.g. "2024-07-01"
  timeSlot: {
    start: string;
    end: string;
  };

  status?: "pending" | "confirmed" | "cancelled";
}
