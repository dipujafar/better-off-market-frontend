import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import PrivacyPolicyContainer from "./_components/PrivacyPolicyContainer";

export const metadata = {
  title: "Privacy Policy",
  description: "Agreement of Privacy policy",
};

export default function PrivacyPolicyPage() {
  const bannerData = {
    title: "Privacy Policy",
    description: "Agreement of Privacy policy",
    className: "min-h-[50vh]",
    dataClassName: "md:grid-cols-1 text-center gap-y-4",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <PrivacyPolicyContainer />
    </div>
  );
}
