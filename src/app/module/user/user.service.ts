import User from "./user.model";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

// Register User
const registerUserIntoDB = async (data: Partial<IUser>): Promise<IUser> => {
  const { username, password, shopNames } = data;

  // Check for unique shop names globally
  const existingShop = await User.findOne({ shopNames: { $in: shopNames } });
  if (existingShop) {
    throw new Error("One or more shop names already taken");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password!, 10);

  const user = new User({
    username,
    password: hashedPassword,
    shopNames,
  });

  return await user.save();
};

//Login User
const loginUserFromDB = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

export const UserServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
