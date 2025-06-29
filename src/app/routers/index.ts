import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
import { PublicDOctorRoutes } from "../module/patient/viewDoctorProfile/viewDoctorProfile.route";
import { AdminRoutes } from "../module/Admin/Admin.route";
const router = Router();

const moduleROuters = [
    {

        path: "/auth",
        route: UserRoutes,
    
    },
    {
        path:"/doctor",
        route:DoctorRoutes
    },
    {
        path:"/doctors",
        route:PublicDOctorRoutes
    },
    {
        path:"/admin",
        route:AdminRoutes
    }
]
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;