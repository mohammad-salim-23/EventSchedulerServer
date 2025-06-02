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
     // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, contain at least one number, and one special character",
      });
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
    const { username, password , rememberMe } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await UserServices.loginUserFromDB(username, password);
  const expiresIn = rememberMe? "7d": "30m";
   const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000; // 7 days or 30 mins
    const token = jwt.sign(
      { userId: user._id, username: user.username , shopNames:user.shopNames},
      process.env.JWT_SECRET || "defaultsecret",
     { expiresIn }
    );
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
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
};
export const logoutUser = async(req: Request, res: Response) => {
 
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
     domain: ".localtest.me", 
    path: "/", 
  });

  return res.status(200).json({ message: "Logout successful" });
};
export const UserControllers = {
  registerUser,
  loginUser,
  logoutUser

};