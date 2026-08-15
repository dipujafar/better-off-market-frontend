import LoginForm from "./_components/LoginForm";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";

export const metadata = {
    title: "Login",
    description: "This the official website of Better Off Market",
};

export default function page() {
  const bannerData = {
    authPage: true,
  };
  return (
    <>
      <div className="relative">
        <HeroBanner data={bannerData} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
