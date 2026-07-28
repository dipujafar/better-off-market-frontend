import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import TermContainer from "./_components/TermContainer";

export const metadata = {
  title: "Terms & Conditions",
  description: "This the official website of Better Off Market",
};

export default function TermsConditionsPage() {
  const bannerData = {
    title: "Terms and Conditions",
    description: "Agreement of Terms",
    className: "min-h-[50vh]",
    dataClassName: "md:grid-cols-1 text-center gap-y-4",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <TermContainer />
    </div>
  );
}
