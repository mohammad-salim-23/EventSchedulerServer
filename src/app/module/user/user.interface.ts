import { Types } from "mongoose";

export type UserRole = "doctor" | "patient";

export interface IUser {
  _id?: string | Types.ObjectId;
  username: string;
  password: string;
  role: UserRole;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Doctor-specific
  specialization?: string;
  hospitalName?: string;
  hospitalFloor?: string;

  // Patient-specific
  age?: number;
  gender?: "male" | "female" | "other";
}
