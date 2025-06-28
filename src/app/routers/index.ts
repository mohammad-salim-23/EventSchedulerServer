import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
const router = Router();

const moduleROuters = [
    {

        path: "/auth",
        route: UserRoutes,
    
    },
    {
        path:"/doctor",
        route:DoctorRoutes
    }
]
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;