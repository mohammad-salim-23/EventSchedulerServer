import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";

export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const user = await UserServices.registerUserIntoDB({
      ...req.body,
      role: "doctor",
    });
    res.status(201).json({ message: "Doctor registered successfully", userId: user._id });
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
    res.status(201).json({ message: "Patient registered successfully", userId: user._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Patient registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserServices.loginUserFromDB(username, password);

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
};

export const UserControllers = {
  registerDoctor,
  registerPatient,
  loginUser,
  logoutUser,
};
