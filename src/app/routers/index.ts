import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { eventRoutes } from "../module/event/event.route";


const router = Router();

const moduleROuters = [
    {

        path: "/auth",
        route: UserRoutes,
    
    },
    {
        path:"/events",
        route:eventRoutes
    }
    
]
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;