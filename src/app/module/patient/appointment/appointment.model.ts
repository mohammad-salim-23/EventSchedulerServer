import { model, Schema } from "mongoose";
import { IAppointment } from "./appointment.interface";

const AppointmentSchema = new Schema<IAppointment>({
  doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctorUsername: { type: String, required: true },
  doctorEmail: { type: String, required: true },

  serviceId: { type: Schema.Types.ObjectId, required: true },
  serviceTitle: { type: String, required: true },

  day: { type: String, required: true },

  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  patientUsername: { type: String, required: true },
  patientEmail: { type: String, required: true },

  selectedDate: { type: String, required: true },
  timeSlot: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled","completed"],
    default: "pending",
  },
}, { timestamps: true });

const AppointmentModel = model<IAppointment>("Appointment", AppointmentSchema);
export default AppointmentModel;