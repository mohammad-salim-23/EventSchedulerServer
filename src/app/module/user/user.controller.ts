import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";

export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.registerUserIntoDB({
      ...req.body,
      role: "doctor",
    });
    res.status(201).json({ message: "Doctor registered successfully", data: user,userId: user._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Doctor registration failed" });
  }
};

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.registerUserIntoDB({
      ...req.body,
      role: "patient",
    });
    res.status(201).json({ message: "Patient registered successfully",
       data: user, userId: user._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Patient registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    let token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
        return res.status(400).json({ message: "You are already logged in" });
      } catch {
        // Invalid token - continue to login
      }
    }

    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        message: "Either username or email and password must be provided",
      });
    }

    const user = await UserServices.loginUserFromDB({ username, email, password });

    let newToken = jwt.sign(
      {
        userId: user._id,
        username: user?.username,
        userEmail: user?.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "24h" }
    );

    // Set cookie with newToken, not old token variable
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use HTTPS in production
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ token: newToken, message: "Login successful" });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};


export const logoutUser = async (req: Request, res: Response) => {
   const token = req.cookies?.accessToken;
    if (!token) {
    return res.status(201).json({ message: "Already logged out" });
  }
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
};

export const UserControllers = {
  registerDoctor,
  registerPatient,
  loginUser,
  logoutUser,
};
