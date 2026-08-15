import HeroBanner from '@/components/shared/hero_banner/HeroBanner';
import ResetPasswordForm from './_components/ResetPassword';

export default function ResetPasswordPage()  {
  const bannerData = {
    authPage: true,
  };
  return (
    <div className="relative">
      <HeroBanner data={bannerData} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto z-50">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
