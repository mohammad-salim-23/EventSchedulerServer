import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "patient"], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    // Doctor-specific fields
    specialization: { type: String },
    hospitalName: { type: String },
    hospitalFloor: { type: String },

    // Patient-specific fields
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
