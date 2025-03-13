import mongoose, { Schema } from "mongoose";
import { IUser, IUserModel } from "@/types/UserTypes";

const RequiredString = { type: String, required: true };
const LiftRecordSchema = new Schema({
  date: Date,
  exerciseName: String,
  performance: { reps: Number, weight: Number },
  parameters: {
    bodyweight: Number,
    powerLevel: Number,
    type: String,
    fatigue: Number,
  },
});

const Exercise = {
  name: { type: String },
  peakLiftId: mongoose.Types.ObjectId,
  currentLiftId: mongoose.Types.ObjectId,
};

const UserSchema = new Schema<IUser, IUserModel>({
  name: RequiredString,
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  strengthProfile: [Exercise],
  trainingSchedule: {
    type: {
      Monday: String,
      Tuesday: String,
      Wednesday: String,
      Thursday: String,
      Friday: String,
      Saturday: String,
      Sunday: String,
    },
    default: null,
  },
  liftHistory: [LiftRecordSchema],
  analysis: {
    averageProgressionRate: { type: Number, default: null },
    averageFatigue: { type: Number, default: null },
    averageExpectationResults: { type: Number, default: null },
  },
  clerkId: RequiredString,
});

export { UserSchema };
