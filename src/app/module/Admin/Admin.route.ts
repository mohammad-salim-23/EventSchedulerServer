
import express  from "express";
import { AdminController } from "./Admin.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../../types/global";
const router = express.Router();


router.get("/allcollections",auth(USER_ROLE.ADMIN), AdminController.getAdminDashboardSummary);

export const AdminRoutes = router;