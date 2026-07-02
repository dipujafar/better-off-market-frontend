"use client";

import Container from "@/components/shared/container/Container";
import SubscriptionForm from "./SubscriptionForm";

export function GetInTouch() {
  return (
    <Container className="w-full">
      <div className="bg-primary-color rounded-3xl p-4  md:p-12 lg:p-16 text-white">
        <div className="grid md:grid-cols-2 gap-5 items-center">
          {/* Left Content */}
          <div className="max-w-122.75">
            <h2 className="xl:text-[32px] text-2xl font-bold mb-4 leading-tight">
             Get notified of new listings in your area
            </h2>
            <p className="text-lg leading-relaxed">
              Enter your email and we&apos;ll alert you when new properties are
              added near you. Never miss an investment opportunity again.
            </p>
          </div>

          {/* Right Form */}
          <SubscriptionForm />
        </div>
      </div>
    </Container>
  );
}
