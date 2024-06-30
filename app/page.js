
import LandingNavBar from "./dashboard/_components/LandingNavBar";
import LandingHero from "./dashboard/_components/LandingHero";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <div className="mx-10">
    <WavyBackground backgroundFill={'white'} className='overflow-hidden w-[100%]'>
      <LandingNavBar />
      <LandingHero />
      </WavyBackground>
    </div>
  );
}
