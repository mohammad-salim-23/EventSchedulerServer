import { Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse"; // adjust path based on your project structure
import { EventServices } from "./event.service";

export const createEvent = (req: Request, res: Response) => {
  try {
    const newEvent = EventServices.createEvent(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const getAllEvents = (req: Request, res: Response) => {
  const allEvents = EventServices.getAllEvents();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    data: allEvents,
  });
};

export const archiveEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedEvent = EventServices.updateEventArchivedStatus(id);
  if (!updatedEvent) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event archived successfully",
    data: updatedEvent,
  });
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = EventServices.deleteEvent(id);
  if (!deleted) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Event not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Event deleted successfully",
    data: null,
  });
};
