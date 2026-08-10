import { PropertyCard } from "@/components/shared/card/property-card";
import Container from "@/components/shared/container/Container";
import HeroBanner from "@/components/shared/hero_banner/HeroBanner";
import FilterOptions from "@/components/shared/utils/FilterOptions";
import { PropertiesSortBar } from "./_components/PropertiesSortBar";
import PaginationSection from "@/components/shared/pagination/PaginationSection";
import { tagTypes } from "@/redux/tagTypes";
import { apiGet } from "@/lib/api/fetcher";
import { IPropertyResponse } from "@/types";
import { IApiResponse } from "@/types/api-response";

export const metadata = {
  title: "Properties",
  description: "This the official website of Better Off Market",
};

export default async function page() {
  const bannerData = {
    title: "Browse properties",
    description:
      "Browse verified listings — no agents, no middlemen. Professional real estate investment, simplified for the modern investor.",
    className: "min-h-[50vh]",
  };

  const result = await apiGet<IApiResponse<IPropertyResponse[]>>("/properties", {
    // params: {
    //   status: status || "active",
    //   sort: sort || "-createdAt",
    //   page: page ? Number(page) : 1,
    //   limit: 10,
    // },
    tags: [tagTypes.property],
  });


  const properties = result?.data || [];
  return (
    <div className="space-y-16">
      <HeroBanner data={bannerData} />
      <Container className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-4 ">
        <div>
          <FilterOptions />
        </div>
        <div className="lg:col-span-2 xl:col-span-3">
          <PropertiesSortBar total={properties?.length} />
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4">
            {properties?.map((property, index) => (
              <PropertyCard key={index} {...property} className="xl:h-56" />
            ))}
          </div>
          <PaginationSection total={result?.meta?.total as number} current={1} />
        </div>
      </Container>
    </div>
  );
}
