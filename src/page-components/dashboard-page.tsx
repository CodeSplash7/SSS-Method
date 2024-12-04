import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const saveUserToDatabase = async () => {
    await connectToDatabase();

    // Check if user exists in DB
    const existingUser = await User.findOne({ clerkId: user.id });

    if (!existingUser) {
      const newUser = new User({
        clerkId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        strengthProfile: null
      });

      await newUser.save();
    }
    return !existingUser?.getPerformanceLevel("peak");
  };

  const isFirstTime = await saveUserToDatabase();

  if (isFirstTime)
    return (
      <div className="w-screen h-screen bg-[#1cbac875] flex justify-center items-center">
        <div className="w-[600px] bg-white flex flex-col p-[48px] justify-start items-center gap-[32px] rounded-[14px]">
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
