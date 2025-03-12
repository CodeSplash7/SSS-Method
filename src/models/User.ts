import { connectToDatabase } from "@/lib/mongodb";
import mongoose, { Document, Schema, Model } from "mongoose";

type Performance = { reps: number; weight: number };

type Exercise = {
  name: string;
  peakPerformance: Performance;
  currentPerformance: Performance;
};

type StrengthProfile = Exercise[];

// Define the User interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  strengthProfile: StrengthProfile;
  clerkId: string;
  getPerformanceLevel: (state: "peak" | "current") => number;
}

// Extend the Model interface to include the static method
export interface IUserModel extends Model<IUser> {
  findAllUsers(): Promise<IUser[]>;
}

// Create the schema
const UserSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  strengthProfile: [
    new Schema({
      name: { type: String },
      peakState: { reps: Number, weight: Number },
      currentState: { reps: Number, weight: Number }
    })
  ],
  clerkId: { type: String, required: true }
});

// Add the static method to the schema
UserSchema.statics.findAllUsers = async function (): Promise<IUser[]> {
  await connectToDatabase();
  return this.find();
};

UserSchema.statics.createUser = async function (
  data: Partial<IUser>
): Promise<IUser> {
  await connectToDatabase();
  const newUser = new User(data);
  return newUser.save();
};

UserSchema.statics.findUserByEmail = async function (
  email: string
): Promise<IUser | null> {
  await connectToDatabase();
  return User.findOne({ email });
};

UserSchema.methods.getPerformanceLevel = function (state: "peak" | "current") {
  const performanceLevels: { overall: number; [key: string]: number } = {
    overall: 0
  };
  for (let exercise of this.strengthProfile) {
    const performanceLevel = calculate1RM(exercise[`${state}Performance`]);
    performanceLevels[exercise.name] = performanceLevel;
    performanceLevels.overall =
      (performanceLevel + performanceLevels.overall) /
        Object.keys(performanceLevels).length -
      1;
  }
  return performanceLevels;
};

// Define the model (use existing or create a new one)
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;

function calculate1RM(performance: Performance): number {
  const { weight, reps } = performance;
  return weight * (1 + 0.0333 * reps);
}
