
import { IUser } from "./user.interface";
import User from "./user.model";


const createUser = async (data: IUser) => {
  return await User.create(data);
};

export const UserServices = {
  createUser,

};
