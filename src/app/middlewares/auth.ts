/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../module/user/user.model";
import AppError from "../errors/AppError";

// const auth = (...requiredRoles: TUserRole[]) => {
//     return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers.authorization;
//         if (!token) {
//             throw new AppError(401, "You are not authorized.");
//         }
//         let decode;
//         try {
//             decode = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
//         } catch (err) {
//             throw new AppError(401, "You are not authorized.");
//         }
//         // console.log("Token User", decode);
//         const role = decode.role;

//         if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
//             throw new AppError(401, "You are not authorized.");
//         }

//         const user = await User.findOne({ email: decode.email });

//         if (!user) {
//             throw new AppError(401, "This user in not found!");
//         }
//         req.user = decode;
//         next();
//     })
// }

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "You are not authorized. Token missing or malformed.");
    }

    const token = authHeader.split(" ")[1]; // extract token part only

    let decode;
    try {
      decode = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (err) {
      throw new AppError(401, "Invalid token. Please login again.");
    }

    const role = decode.role;

    if (!requiredRoles.includes(role)) {
      throw new AppError(403, "Forbidden: Insufficient role permission.");
    }

    const user = await User.findById(decode.userId);
    if (!user) {
      throw new AppError(401, "User not found.");
    }

    req.user = {
      userId: decode.userId,
      email: decode.email,
      username: decode.username,
      role: decode.role,
    };

    next();
  });
};


export default auth;