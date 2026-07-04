import { GetInTouch } from "@/components/modules/home/get_in_touch/GetInTouch";
import ContactUs from "@/components/shared/contact/ContactUs";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";

export const metadata = {
    title: "Contact us",
    description: "This the official website of Better Off Market",
};

export default function page() {
  const bannerData = {
    title: "Contact us",
    description: "Contact our team",
    className: "min-h-[50vh]",
    dataClassName: "md:grid-cols-1 text-center gap-y-4",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <ContactUs />
      <GetInTouch />
    </div>
  );
}
