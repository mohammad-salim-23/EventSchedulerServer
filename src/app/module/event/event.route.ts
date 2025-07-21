import express from "express";

import { validateEventInput } from "./event.validation";
import { archiveEvent, createEvent, deleteEvent, getAllEvents } from "./event.controller";


const router = express.Router();

router.post("/", validateEventInput, createEvent);
router.get("/", getAllEvents);
router.put("/:id", archiveEvent);
router.delete("/:id", deleteEvent);

export const eventRoutes = router;
