import { SavePropertyCard } from "@/components/shared/card/save-property-card";
import { ISavePropertiesResponse } from "@/types";



export default function SaveProperties({data}: {data: ISavePropertiesResponse[]}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:gap-6 gap-4">
      {data?.map((property, index) => (
        <SavePropertyCard key={index} {...property?.property} />
      ))}
    </div>
  );
}
