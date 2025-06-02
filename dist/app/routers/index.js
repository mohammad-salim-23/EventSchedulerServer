"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const router = (0, express_1.Router)();
const moduleROuters = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes,
    }
];
moduleROuters.forEach((route) => router.use(route.path, route.route));
exports.default = router;
