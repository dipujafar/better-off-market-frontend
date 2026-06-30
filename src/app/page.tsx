import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import Navbar from "@/components/shared/navbar/Navbar";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-10 w-full z-20">
        <Navbar variant="transparent" />
      </div>
      <HeroBanner />
    </div>
  );
}
