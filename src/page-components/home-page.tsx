import Br from "@/components/LineBreak";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Parallax from "@/components/Parallax";
import { font_roboto_500 } from "@/general-utils/fonts";

export default async function HomePage() {
  return (
    <div className="w-full h-full">
      <Navbar />

      <Parallax imagePath="/calisthenics-image.png">
        <div
          className={`h-[calc(100vh-76px)] w-full px-[48px] bg-[rgba(0,0,0,0.5)]`}
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

function Motto({ msg }: { msg: string }) {
  return (
    <div className={`text-white text-[20px] ${font_roboto_500}`}>{msg}</div>
  );
}

function StartButton() {
  return (
    <div
      className={`px-[30px] w-fit py-[12.5px] border-0 rounded-full bg-[#1cbac8] text-white font-bold transition-all duration-200 hover:bg-[#ffbe5c] hover:shadow-[0_0_100px_#ffbe5c75] hover:scale-110 active:bg-[#1cbac8] active:duration-250 active:shadow-none active:scale-95`}
    >
      START 🗿
    </div>
  );
}
