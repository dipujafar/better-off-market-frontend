import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import SignupForm from "./_components/SignUpForm";

export const metadata = {
  title: "Sign Up",
  description: "Sign Up to Better Off Market",
};

export default function page() {
  const bannerData = {
    authPage: true,
  };
  return (
    <div className="relative">
      <div className="hidden md:block">
        <HeroBanner data={bannerData} />
      </div>
      <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full mx-auto z-50">
        <SignupForm />
      </div>
    </div>
  );
}
