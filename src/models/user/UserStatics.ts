import { UserSchema } from "./UserModel";
import { connectToDatabase } from "@/lib/mongodb";
import { IUser } from "@/types/UserTypes";

/**
 * Retrieves all users from the database.
 *
 * @async
 * @returns {Promise<IUser[]>} A promise that resolves to an array of user documents.
 */
UserSchema.statics.findAllUsers = async function (): Promise<IUser[]> {
  await connectToDatabase();
  return this.find();
};

/**
 * Adds a new user to the database.
 *
 * @async
 * @param {Partial<IUser>} data - An object containing the user's details.
 * Fields may include `name`, `email`, `clerkId`, and `strengthProfile`.
 * @returns {Promise<IUser>} A promise that resolves to the newly created user document.
 */
UserSchema.statics.createUser = async function (
  data: Partial<IUser>
): Promise<IUser> {
  await connectToDatabase();
  const newUser = new this(data);
  return newUser.save();
};

/**
 * Finds a user in the database by their email address.
 *
 * @async
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<IUser | null>} A promise that resolves to the user document if found, or `null` if not found.
 */
UserSchema.statics.findUserByEmail = async function (
  email: string
): Promise<IUser | null> {
  await connectToDatabase();
  return this.findOne({ email });
};
