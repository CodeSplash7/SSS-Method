import mongoose, { Document, Model, Types } from "mongoose";

export type PowerLevels = {
  [key: string]: number;
  overall: number;
};

export type Exercise = {
  name: string;
  peakLiftId: mongoose.Types.ObjectId | null;
  currentLiftId: mongoose.Types.ObjectId | null;
};

export type StrengthProfile = Exercise[];

export type TrainingSchedule =
  | {
      [day in
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
        | "Sunday"]: "Push" | "Pull" | "Legs" | "Rest";
    }
  | null;

export type LiftRecord = {
  _id: Types.ObjectId;
  date: Date;
  exerciseName: string;
  performance: { reps: number; weight: number };
  parameters: {
    bodyweight: number;
    powerLevel: number;
    type: "eccentric" | "concentric";
    fatigue: number;
  };
};

export type LiftHistory = LiftRecord[];

export type UserAnalysis = {
  averageProgressionRate: number | null;
  averageFatigue: number | null;
  averageExpectationResults: number | null;
};

export type User = {
  name: string;
  email: string;
  age: number | null;
  strengthProfile: StrengthProfile;
  trainingSchedule: TrainingSchedule;
  liftHistory: LiftHistory;
  analysis: UserAnalysis;

  clerkId: string;
};

export interface IUser extends Document, User {
  getPowerLevels: (state: "peak" | "current") => PowerLevels;
}

export interface IUserModel extends Model<IUser> {
  findAllUsers(): Promise<IUser[]>;
  createUser(data: Partial<IUser>): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
