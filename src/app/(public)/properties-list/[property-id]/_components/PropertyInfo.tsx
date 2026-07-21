import {
  HomeIcon,
  LandScapeIcon,
  MajoComponentsIcon,
  PeopleIcon,
  PoolIcon,
  SpecificationsIcon,
} from "@/icons";
import { Club, LandPlot } from "lucide-react";

interface SpecItem {
  label: string;
  value: string | number;
}

interface HoaInclude {
  label: string;
  icon: React.ReactNode;
}

interface PropertyInfoProps {
  hoaFee?: string;
  hoaIncludes?: HoaInclude[];
  components?: SpecItem[];
  specifications?: SpecItem[];
}

export function PropertyInfo({
  hoaFee = "$150/mo",
  hoaIncludes = [
    { label: "Pool", icon: <PoolIcon /> },
    { label: "Clubhouse", icon: <PeopleIcon className="size-4" /> },
    { label: "Landscaping", icon: <LandScapeIcon /> },
  ],
  components = [
    { label: "Roof", value: "Shingle / 5 years" },
    { label: "Heating", value: "Gas / 8 years" },
    { label: "Cooling", value: "Central AC / 4 years" },
    { label: "Sewer", value: "Public Sewer" },
  ],
  specifications = [
    { label: "Lot Size", value: "0.25 Acres" },
    { label: "Year Built", value: "1995" },
    { label: "Garage Spaces", value: "2" },
    { label: "Parking", value: "Driveway" },
  ],
}: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* HOA Details Card */}
        <div className="rounded-lg bg-gray-100 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex items-center gap-2">
            <HomeIcon />
            <h2 className="text-2xl font-semibold text-primary-black">
              HOA Details
            </h2>
          </div>

          <div className="mb-4 flex justify-between">
            <span className="text-gray-600">Monthly Fee</span>
            <span className="font-semibold text-primary-black">{hoaFee}</span>
          </div>

          <div>
            <span className="text-gray-600">Includes:</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {hoaIncludes.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 rounded-full border border-primary-border-color bg-white px-3 py-1 text-sm text-primary-black"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Major Components Card */}
        <div className="rounded-lg bg-gray-100 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex items-center gap-2">
            <MajoComponentsIcon />
            <h2 className="text-2xl font-semibold text-primary-black">
              Major Components
            </h2>
          </div>
          <div className="space-y-4">
            {components.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-primary-black">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications Card - Full Width */}
      <div className="rounded-lg bg-gray-100 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
        <div className="mb-6 flex items-center gap-2">
          <SpecificationsIcon />
          <h2 className="text-2xl font-semibold text-primary-black">
            Specifications
          </h2>
        </div>
        <div className="space-y-4">
          {specifications.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            >
              <span className="text-gray-600">{item.label}</span>
              <span className="font-semibold text-primary-black">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
