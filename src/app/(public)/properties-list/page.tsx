import { PropertyCard } from "@/components/shared/card/property-card";
import Container from "@/components/shared/container/Container";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import { properties } from "@/data/properties";
import React from "react";

export default function page() {
  const bannerData = {
    title: "Browse properties",
    description:
      "Browse verified listings — no agents, no middlemen. Professional real estate investment, simplified for the modern investor.",
    className: "min-h-[50vh]",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {properties.slice(0, 9).map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </Container>
    </div>
  );
}
