/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Types } from "mongoose";
import { sendResponse } from "../../utils/sendResponse";
import { EventServices } from "./event.service";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User ID missing.",
        data: null,
      });
    }

    const newEvent = await EventServices.createEvent(req.body, new Types.ObjectId(userId));
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

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await EventServices.getAllEvents();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Events retrieved successfully",
      data: allEvents,
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

export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User ID missing.",
        data: null,
      });
    }

    const userEvents = await EventServices.getUserEvents(new Types.ObjectId(userId).toString());
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User events retrieved successfully",
      data: userEvents,
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

export const archiveEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User ID missing.",
        data: null,
      });
    }

    const updatedEvent = await EventServices.updateEventArchivedStatus(
      id,
      new Types.ObjectId(userId).toString()
    );

    if (!updatedEvent) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found or not authorized",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event archived successfully",
      data: updatedEvent,
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

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User ID missing.",
        data: null,
      });
    }

    const deleted = await EventServices.deleteEvent(id, new Types.ObjectId(userId).toString());

    if (!deleted) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Event not found or not authorized",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Event deleted successfully",
      data: null,
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
