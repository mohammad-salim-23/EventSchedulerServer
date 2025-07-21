import { Request, Response } from "express";
import User from "./user.model";
import config from "../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully", data: user });
  } catch (error: any) {
    if (error.code === 11000) {
      
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

 const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  //Generate JWT token
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username || user?.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_secret as string,
    { expiresIn: "1d" }
  );


  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    },
  });
};
export const UserControllers = {registerUser,loginUser};