import { Types } from "mongoose";

export type UserRole = "admin" | "landlord" | "tenant";

export type IUser = {
  _id?: string | Types.ObjectId;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  
  shopNames: string[]; 
};
