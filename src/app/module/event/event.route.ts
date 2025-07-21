import express from "express";

import { validateEventInput } from "./event.validation";
import { archiveEvent, createEvent, deleteEvent, getAllEvents } from "./event.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";


const router = express.Router();

router.post("/",auth(USER_ROLE.USER), validateEventInput, createEvent);
router.get("/", getAllEvents);
router.put("/:id",auth(USER_ROLE.USER), archiveEvent);
router.delete("/:id",auth(USER_ROLE.USER), deleteEvent);

export const eventRoutes = router;
