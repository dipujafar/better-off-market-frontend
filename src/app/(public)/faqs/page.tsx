import FAQS from "@/components/modules/home/faqs/FAQS";
import FAQSection from "@/components/modules/home/faqs/FaqsSection";
import { GetInTouch } from "@/components/modules/home/get_in_touch/GetInTouch";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import React from "react";

export default function page() {
  const bannerData = {
    title: "Frequently asked questions",
    description: "Everything you need to know before getting started.",
    className: "min-h-[50vh]",
    dataClassName: "md:grid-cols-1 text-center gap-y-4",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <FAQS />
      <GetInTouch />
    </div>
  );
}
