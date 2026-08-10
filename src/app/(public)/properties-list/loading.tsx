import Container from "@/components/shared/container/Container";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import FilterOptions from "@/components/shared/utils/FilterOptions";
import React from "react";
import { PropertiesSortBar } from "./_components/PropertiesSortBar";

export default function loading() {
  const bannerData = {
    title: "Browse properties",
    description:
      "Browse verified listings — no agents, no middlemen. Professional real estate investment, simplified for the modern investor.",
    className: "min-h-[50vh]",
  };
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <Container className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
        <div>
          <FilterOptions />
        </div>
        <div className="lg:col-span-2 xl:col-span-3 bg-red-500">
          {/* <PropertiesSortBar total={properties.length} /> */}
          {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4">
            {result?.data?.map((property, index) => (
              <PropertyCard key={index} {...property} className="xl:h-56" />
            ))}
          </div>
          <PaginationSection total={result.meta?.total!} current={1} /> */}
          loading .....
        </div>
      </Container>
    </div>
  );
}
