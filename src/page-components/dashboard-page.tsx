import ProgressionStep from "@/components/ProgressionStep";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user/index";
import { User as CustomUserType, UserAnalysis } from "@/types/UserTypes";
import { StrengthProfile } from "@/types/UserTypes";
import type { User as UserType } from "@clerk/backend";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Page component
 * - dashboard
 *
 * @export
 * @async
 * @returns {React.ReactNode}
 */
export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const loggedUser = await ensureUserExists(user, () => createUser(user));
  const hasPerformanceData = loggedUser?.getPowerLevels("peak").overall;
  console.log(hasPerformanceData);

  if (!hasPerformanceData) return <ProgressionStep />;
  return <div>DASHBOARD</div>;
}

/**
 * Ensures the user exists on the database from its Id
 * If it exists, it returns the user
 * If it does not, it runs the callback function adn returns null
 *
 * @async
 * @param {typeof User} user - Instance from clerk's type
 * @param {() => void} [callback] - Optional parameter: Callback if the user doesn't exist on the database (signin up)
 * @returns {null | typeof User}
 */
const ensureUserExists = async (user: UserType, callback?: () => void) => {
  await connectToDatabase();

  const existingUser = await User.findOne({ clerkId: user.id });

  if (!existingUser) {
    callback?.();
    return null;
  }

  return existingUser;
};

/**
 * Adds new user to the mongodb database
 *
 * @async
 * @param {UserType} user - User instance from clerk's types
 * @returns {Promise<void>}
 */
const createUser = async (user: UserType): Promise<void> => {
  const newUser = new User({
    clerkId: user.id,
    name: user.fullName,
    email: user.emailAddresses[0].emailAddress,
    strengthProfile: defaultStrengthProfile,
    age: defaultAge,
    analysis: defaultAnalysis,
    liftHistory: [],
    trainingSchedule: null,
  } as CustomUserType);

  await newUser.save();
};

/**
 * The default value for StrenghtProfile
 * Results to overall performance of 0
 *
 * @type {StrengthProfile}
 */
const defaultStrengthProfile: StrengthProfile = [
  {
    name: "Pullups",
    peakLiftId: null,
    currentLiftId: null,
  },
  {
    name: "Dips",
    peakLiftId: null,
    currentLiftId: null,
  },
];

const defaultAge = null;

const defaultAnalysis: UserAnalysis = {
  averageExpectationResults: null,
  averageFatigue: null,
  averageProgressionRate: null,
};
