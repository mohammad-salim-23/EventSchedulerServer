
import { Schema, model } from "mongoose";
import { IAvailabilitySlot, IDoctor, IService } from "./doctor.interface";


const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const AvailabilitySlotSchema = new Schema<IAvailabilitySlot>({
  day: { type: String, required: true },
  slots: [
    {
      start: { type: String, required: true }, // store as string e.g., "10:00 AM"
      end: { type: String, required: true },
    },
  ],
});

const DoctorSchema = new Schema<IDoctor>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  services: [ServiceSchema],
  availability: [AvailabilitySlotSchema],
});

const DoctorModel = model<IDoctor>("Doctor", DoctorSchema);
export default DoctorModel;
