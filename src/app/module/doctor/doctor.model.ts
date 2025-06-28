import { Schema, model } from "mongoose";
import { IDoctor, IService, IAvailabilitySlot } from "./doctor.interface";

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },

    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    doctorUsername: { type: String, required: true },
    doctorEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const AvailabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    day: { type: String, required: true },
    slots: [
      {
        start: { type: String, required: true },
        end: { type: String, required: true },
      },
    ],

    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    doctorUsername: { type: String, required: true },
    doctorEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const DoctorSchema = new Schema<IDoctor>({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "User" },
  services: [ServiceSchema],
  availability: [AvailabilitySlotSchema],
});

const DoctorModel = model<IDoctor>("Doctor", DoctorSchema);
export default DoctorModel;
