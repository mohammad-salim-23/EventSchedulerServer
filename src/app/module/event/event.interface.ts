import { Types } from "mongoose";

export interface IEvent {
  _id?: Types.ObjectId;
  title: string;
  date: string; // ISO date
  time: string; // HH:mm format
  notes?: string;
  archived: boolean;
  category: "Work" | "Personal" | "Other";
}
