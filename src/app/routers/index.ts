import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
const router = Router();

const moduleROuters = [
    {

        path: "/auth",
        route: UserRoutes,
    
    }
]
moduleROuters.forEach((route) => router.use(route.path, route.route));
export default router;