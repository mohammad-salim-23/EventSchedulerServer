import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { UserServices } from "./user.service";

// Controller: Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, shopNames } = req.body;

    if (!username || !password || !shopNames) {
      return res
        .status(400)
        .json({ message: "Username, password, and shop names are required" });
    }
    if (shopNames.length < 3 || shopNames.length > 4) {
      return res
        .status(400)
        .json({ message: "You must provide 3 or 4 shop names" });
    }
    const user = await UserServices.registerUserIntoDB({
      username,
      password,
      shopNames,
    });

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

// Controller: Login User
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await UserServices.loginUserFromDB(username, password);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};
export const UserControllers = {
  registerUser,
  loginUser

};