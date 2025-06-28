
import { Types } from "mongoose";

export interface IService {
  _id?: string | Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
}

export interface IAvailabilitySlot {
  day: string; // e.g. "Monday"
  slots: { start: string; end: string }[]; // time slots in HH:mm or "10:00 AM"
}

export interface IDoctor {
  _id?: string | Types.ObjectId;
  userId: Types.ObjectId; // reference to User
  services: IService[];
  availability: IAvailabilitySlot[];
}
