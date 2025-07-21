import { IEvent } from "./event.interface";
import Event from "./event.model";


// Keywords
const workKeywords = ["meeting", "project", "client"];
const personalKeywords = ["birthday", "family"];

const createEvent = async (
  data: Omit<IEvent, "_id" | "category" | "archived"> & { notes?: string }
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
  });

  return newEvent;
};

 const getAllEvents = async (): Promise<IEvent[]> => {
  return Event.find().sort({ date: 1, time: 1 });
};

 const updateEventArchivedStatus = async (_id: string): Promise<IEvent | null> => {
  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    { archived: true },
    { new: true }
  );
  return updatedEvent;
};

const deleteEvent = async (_id: string): Promise<boolean> => {
  const deletedEvent = await Event.findByIdAndDelete(_id);
  return !!deletedEvent;
};
export const EventServices = {createEvent,getAllEvents,updateEventArchivedStatus,deleteEvent }