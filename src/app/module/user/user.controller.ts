import { Request, Response } from "express";
import User from "./user.model";
import config from "../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered", data: user });
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
      username: user.username,
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