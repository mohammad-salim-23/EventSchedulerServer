import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import User from "./user.model";


const registerUserIntoDB = async (data: Partial<IUser>): Promise<IUser> => {
  const { username, email, phone, password } = data;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new Error("Username or email already taken");

  const hashedPassword = await bcrypt.hash(password!, 10);
  const user = new User({ ...data, password: hashedPassword });
  return await user.save();
};

const loginUserFromDB = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
