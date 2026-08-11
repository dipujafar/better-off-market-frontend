import { tagTypes } from "@/redux/tagTypes";
import { apiGet } from "@/lib/api/fetcher";
import { IPropertyResponse } from "@/types";
import { IApiResponse } from "@/types/api-response";
import Empty from "@/components/ui/empty-data";
import { PropertiesSortBar } from "./PropertiesSortBar";
import { PropertyCard } from "@/components/shared/card/property-card";
import PaginationSection from "@/components/shared/pagination/PaginationSection";

export default async function ListedProperties() {
  const result = await apiGet<IApiResponse<IPropertyResponse[]>>(
    "/properties",
    {
      // params: {
      //   status: status || "active",
      //   sort: sort || "-createdAt",
      //   page: page ? Number(page) : 1,
      //   limit: 10,
      // },
      tags: [tagTypes.property],
    },
  );

  const properties = result?.data || [];
  const metaData = result?.meta;
  console.log(metaData?.total);
  return (
    <div>
      {!metaData?.total && (
        <Empty message="No properties found" className="mt-16" />
      )}
      {metaData?.total && (
        <>
          <PropertiesSortBar total={properties?.length} />
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-4">
            {properties?.map((property, index) => (
              <PropertyCard key={index} {...property} className="xl:h-56" />
            ))}
          </div>
          <PaginationSection
            total={result?.meta?.total as number}
            current={1}
          />
        </>
      )}
    </div>
  );
}
