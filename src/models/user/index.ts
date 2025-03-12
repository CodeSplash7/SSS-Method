import mongoose from "mongoose";
import { IUser, IUserModel } from "@/types/UserTypes";
import { UserSchema } from "./UserModel";
import "./UserMethods";
import "./UserStatics";

// Use existing or create a new model
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
