import { Document, Model } from "mongoose";

export type PerformanceLevels = {
  [key: string]: number;
  overall: number;
};
export type Performance = { reps: number; weight: number };

export type Exercise = {
  name: string;
  peakPerformance: Performance;
  currentPerformance: Performance;
};

export type StrengthProfile = Exercise[];

export interface IUser extends Document {
  name: string;
  email: string;
  strengthProfile: StrengthProfile;
  clerkId: string;
  getPerformanceLevel: (state: "peak" | "current") => PerformanceLevels;
}

export interface IUserModel extends Model<IUser> {
  findAllUsers(): Promise<IUser[]>;
  createUser(data: Partial<IUser>): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
}
