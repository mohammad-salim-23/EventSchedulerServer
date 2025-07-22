import express from "express";
import { validateEventInput } from "./event.validation";
import { archiveEvent, createEvent, deleteEvent, getAllEvents, getUserEvents } from "./event.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";

const router = express.Router();

router.post("/", auth(USER_ROLE.USER), validateEventInput, createEvent);
router.get("/", getAllEvents);
router.get("/my-events", auth(USER_ROLE.USER), getUserEvents); 
router.patch("/:id", auth(USER_ROLE.USER), archiveEvent);
router.delete("/:id", auth("user"), deleteEvent);

export const eventRoutes = router;
