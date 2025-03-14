import Br from "@/components/LineBreak";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Parallax from "@/components/Parallax";
import StartButton from "@/components/StartButton";
import { font_roboto_500 } from "@/general-utils/fonts";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="relative w-full h-fit home">
      <Navbar />

      <Parallax imagePath="/calisthenics-image.png">
        <div
          className={`h-[calc(100vh-76px)] w-full px-[8px] sm:px-[48px] bg-[rgba(0,0,0,0.5)]`}
        >
          <Br count={3} />
          <Logo />
          <Br />
          <Motto msg="The best strength program ever." />
          <Br count={2} />
          <div className={"sm:hidden"}>
            <Br count={6} />
          </div>
          <StartButton />
        </div>
      </Parallax>
    </div>
  );
}

/**
 * A motto component
 * - white text, 24px font, roboto
 *
 * @param {{ msg: string }} message motto message
 * @returns {*}
 */
function Motto({ msg }: { msg: string }) {
  return (
    <div
      className={`w-full text-white text-[24px] ${font_roboto_500} text-wrap`}
    >
      {msg}
    </div>
  );
}

/**
 * Redirects to:
 *  - the dashboard
 *  / or
 *  - authentication page
 *
 * @returns {*}
 */
// function StartButton() {
//   return (
//     <>
//       <SignedOut>
//         <SignUpButton>
//           <div
//             className={`sm:text-[1rem] text-[2rem] flex justify-center px-[30px] w-full sm:w-fit py-[20px] sm:py-[12.5px] border-0 rounded-full bg-[#1cbac8] text-white font-bold transition-all duration-200 hover:bg-[#ffbe5c] hover:shadow-[0_0_100px_#ffbe5c75] hover:scale-110 active:bg-[#1cbac8] active:duration-250 active:shadow-none active:scale-95`}
//           >
//             START 🗿
//           </div>
//         </SignUpButton>
//       </SignedOut>
//       <SignedIn>
//         <Link
//           href="/dashboard"
//           className={`sm:text-[1rem] text-[2rem] flex justify-center px-[30px] w-full sm:w-fit py-[20px] sm:py-[12.5px] border-0 rounded-full bg-[#1cbac8] text-white font-bold transition-all duration-200 hover:bg-[#ffbe5c] hover:shadow-[0_0_100px_#ffbe5c75] hover:scale-110 active:bg-[#1cbac8] active:duration-250 active:shadow-none active:scale-95`}
//         >
//           START 🗿
//         </Link>
//       </SignedIn>
//     </>
//   );
// }
