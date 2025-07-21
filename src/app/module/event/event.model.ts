import { Schema, model } from "mongoose";
import { IEvent } from "./event.interface";

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String },
    archived: { type: Boolean, default: false },
    category: { type: String, enum: ["Work", "Personal", "Other"], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

const Event = model<IEvent>("Event", eventSchema);
export default Event;
