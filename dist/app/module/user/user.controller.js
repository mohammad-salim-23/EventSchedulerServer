"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("./user.service");
// Controller: Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, shopNames } = req.body;
        if (!username || !password || !shopNames) {
            return res
                .status(400)
                .json({ message: "Username, password, and shop names are required" });
        }
        // Password validation
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters, contain at least one number, and one special character",
            });
        }
        if (shopNames.length < 3 || shopNames.length > 4) {
            return res
                .status(400)
                .json({ message: "You must provide 3 or 4 shop names" });
        }
        const user = yield user_service_1.UserServices.registerUserIntoDB({
            username,
            password,
            shopNames,
        });
        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message || "Registration failed" });
    }
});
exports.registerUser = registerUser;
// Controller: Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, rememberMe } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Username and password are required" });
        }
        const user = yield user_service_1.UserServices.loginUserFromDB(username, password);
        const expiresIn = rememberMe ? "7d" : "30m";
        const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000; // 7 days or 30 mins
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username, shopNames: user.shopNames }, process.env.JWT_SECRET || "defaultsecret", { expiresIn });
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // use true in prod with HTTPS
            sameSite: "lax",
            domain: ".localtest.me", // Important! set cookie domain for subdomains
            maxAge,
            path: "/",
        });
        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message || "Login failed" });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        domain: ".localtest.me",
        path: "/",
    });
    return res.status(200).json({ message: "Logout successful" });
});
exports.logoutUser = logoutUser;
exports.UserControllers = {
    registerUser: exports.registerUser,
    loginUser: exports.loginUser,
    logoutUser: exports.logoutUser
};
