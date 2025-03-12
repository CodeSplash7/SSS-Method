import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user/index";
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
  const hasPerformanceData = loggedUser?.getPerformanceLevel("peak").overall;

  if (!hasPerformanceData)
    return (
      <div className="z-30 w-screen h-screen bg-[#1cbac875] flex justify-center items-center">
        <div className="w-[600px] scale-75 bg-white flex flex-col p-[48px] justify-start items-center gap-[32px] rounded-[14px]">
          <div className="bg-red-500 text-white font-bold text-[20px] text-center rounded-full px-[32px] py-[12px]">
            ONE MORE STEP!
          </div>
          <div className="flex flex-col text-[#6741d9] text-[40px] items-center">
            <div>Progression Level From</div>
            <div className="font-bold">REQUIRED</div>
          </div>
          <div className="w-2/3 text-center text-[18px]">
            How can I give you the best training plan without knowing your
            level?
          </div>
          <br />
          <div className="bg-[#1cbac8] text-white px-[48px] py-[24px] text-[30px] font-bold">
            FILL FORM 🗿
          </div>
        </div>
      </div>
    );

  return <div>BEAST</div>;
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
 * @param {*} user - User instance from clerk's types
 * @returns {void}
 */
const createUser = async (user: UserType) => {
  const newUser = new User({
    clerkId: user.id,
    name: user.fullName,
    email: user.emailAddresses[0].emailAddress,
    strengthProfile: defaultStrengthProfile,
  });

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
    peakPerformance: { reps: 0, weight: 0 },
    currentPerformance: { reps: 0, weight: 0 },
  },
  {
    name: "Dips",
    peakPerformance: { reps: 0, weight: 0 },
    currentPerformance: { reps: 0, weight: 0 },
  },
];
