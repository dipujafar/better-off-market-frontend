"use client";
import Container from "@/components/shared/container/Container";
import FAQS from "./FAQS";

export default function FAQSection() {
  return (
    <Container className="xl:space-y-16 md:space-y-12 space-y-8">
      {/* Header */}
      <div className=" text-center">
        <h2 className="xl:text-[64px] sm:text-4xl font-bold tracking-tight text-primary-black ">
          Frequently asked questions
        </h2>

        <p className="mt-4 text-lg text-[#565E74]">
          Everything you need to know before getting started.
        </p>
      </div>
      {/* Content */}
      <FAQS />
    </Container>
  );
}
