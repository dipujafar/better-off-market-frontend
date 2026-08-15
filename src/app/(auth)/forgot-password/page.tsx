import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function page() {
  const bannerData = {
    authPage: true,
  };
  return (
    <div className="relative">
      <HeroBanner data={bannerData} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
