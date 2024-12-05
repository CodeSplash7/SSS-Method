import { Schema } from "mongoose";
import { IUser, IUserModel } from "@/types/UserTypes";

const UserSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  strengthProfile: [
    {
      name: { type: String },
      peakPerformance: { reps: Number, weight: Number },
      currentPerformance: { reps: Number, weight: Number }
    }
  ],
  clerkId: { type: String, required: true }
});

export { UserSchema };
