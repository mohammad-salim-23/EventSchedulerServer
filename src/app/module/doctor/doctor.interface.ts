import { Types } from "mongoose";

export interface IService {
  _id?: string | Types.ObjectId;
  title: string;
  description?: string;
  price: number;
  duration: number;
  doctorId: Types.ObjectId;
  doctorUsername: string;
  doctorEmail: string;
}

export interface IAvailabilitySlot {
  _id?: string | Types.ObjectId;
  day: string;
  slots: { start: string; end: string }[];
  doctorId: Types.ObjectId;
  doctorUsername: string;
  doctorEmail: string;
}

export interface IDoctor {
  _id?: string | Types.ObjectId;
  userId: Types.ObjectId; // reference to User document
  services: IService[];
  availability: IAvailabilitySlot[];
}
