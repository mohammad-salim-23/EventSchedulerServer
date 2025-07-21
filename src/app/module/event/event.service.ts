import { IEvent } from "./event.interface";
import Event from "./event.model";
import { Types } from "mongoose";

const workKeywords = ["meeting", "project", "client", "deadline", "presentation", "report"];
const personalKeywords = ["birthday", "family", "anniversary", "vacation", "holiday", "party"];

const createEvent = async (
  data: Omit<IEvent, "_id" | "category" | "archived" | "createdBy"> & { notes?: string },
  userId: Types.ObjectId
): Promise<IEvent> => {
  const { title, notes } = data;
  const titleLower = title.toLowerCase();
  const notesLower = notes?.toLowerCase() || "";

  let category: "Work" | "Personal" | "Other" = "Other";

  if (workKeywords.some(keyword => titleLower.includes(keyword) || notesLower.includes(keyword))) {
    category = "Work";
  } else if (personalKeywords.some(keyword => titleLower.includes(keyword) || notesLower.includes(keyword))) {
    category = "Personal";
  }

  const newEvent = await Event.create({
    ...data,
    archived: false,
    category,
    createdBy: userId,
  });

  return newEvent;
};

const getAllEvents = async (): Promise<IEvent[]> => {
  return Event.find().sort({ date: 1, time: 1 });
};

const getUserEvents = async (userId: string): Promise<IEvent[]> => {
  return Event.find({ createdBy: userId }).sort({ date: 1, time: 1 });
};

const updateEventArchivedStatus = async (_id: string, userId: string): Promise<IEvent | null> => {
  const event = await Event.findOne({_id,createdBy:userId});
  if(!event) return null;
  event.archived = !event.archived;
  await event.save();
  return event;
};

const deleteEvent = async (_id: string, userId: string): Promise<boolean> => {
  const deletedEvent = await Event.findOneAndDelete({ _id, createdBy: userId });
  return !!deletedEvent;
};

export const EventServices = {
  createEvent,
  getAllEvents,
  getUserEvents,
  updateEventArchivedStatus,
  deleteEvent,
};
