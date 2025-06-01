import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
   
   
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    
    username: {
      type: String,
      required: true,
      unique: true,
    },

   

    shopNames: {
      type: [String],
      validate: [
        {
          validator: function (value: string[]) {
            return value.length >= 3 && value.length <= 4;
          },
          message: "You must provide 3 or 4 shop names",
        },
      ],
      required: [true, "Shop names are required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
