"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const router = express_1.default.Router();
router.post('/register', (0, catchAsync_1.default)(user_controller_1.UserControllers.registerUser));
router.post('/login', (0, catchAsync_1.default)(user_controller_1.UserControllers.loginUser));
router.post("/logout", (0, catchAsync_1.default)(user_controller_1.UserControllers.logoutUser));
exports.UserRoutes = router;
