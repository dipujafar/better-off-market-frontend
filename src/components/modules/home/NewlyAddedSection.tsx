import { PropertyCard } from "@/components/shared/card/property-card";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import React from "react";

export default function NewlyAddedSection() {
  const sectionTitleData = {
    title: "Newly Added",
    description: "The latest arrivals to the marketplace.",
    isBtn: true,
  };
  return (
    <Container>
      <SectionTitle data={sectionTitleData} />
      {/* <PropertyCard /> */}
    </Container>
  );
}
