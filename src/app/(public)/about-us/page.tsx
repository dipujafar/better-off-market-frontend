import Navbar from "@/components/shared/navbar/Navbar";
import Header from "./_components/Header";
import Stats from "./_components/Stats";
import MissionSection from "./_components/MissionSection";
import HowItWorks from "./_components/HowItWorks";

export const metadata = {
  title: "About us",
  description: "This the official website of Better Off Market",
};

export default function page() {
  return (
    <div>
      <div className="md:space-y-16 space-y-10">
        <Navbar variant="colored" className="pt-10" />
        <Header />
        <Stats />
        <MissionSection />
      </div>
      <HowItWorks />
    </div>
  );
}
