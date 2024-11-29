import { connectToDatabase } from "@/lib/mongodb";
import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Extend the Model interface to include the static method
export interface IUserModel extends Model<IUser> {
  findAllUsers(): Promise<IUser[]>;
}

// Create the schema
const UserSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
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

// Define the model (use existing or create a new one)
const User =
  (mongoose.models.User as IUserModel) ||
  mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
