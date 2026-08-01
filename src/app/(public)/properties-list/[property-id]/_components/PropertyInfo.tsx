import { PropertySpecificationsIcon } from "@/icons";
import { HomeIcon, ClosingPreferencesIcon, MajorComponentsIcon } from "@/icons";

interface SpecItem {
  label: string;
  value: string;
  note?: string; // e.g. "8 years old", "Updated 2018"
}

interface PropertyInfoProps {
  propertySpecsLeft?: SpecItem[];
  propertySpecsRight?: SpecItem[];
  components?: SpecItem[];
  hoaFee?: string;
  hoaAmenities?: string[];
  closingPreferences?: SpecItem[];
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-[#F2F4F6] border border-[#E2E8F0] p-6">
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-semibold text-primary-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SpecRow({ label, value, note }: SpecItem) {
  return (
    <div className="flex justify-between py-2.5 text-sm">
      <span className="text-[#594139]">{label}</span>
      <span className="font-medium text-primary-black">
        {value}
        {note && (
          <span className="ml-1 font-normal text-[#767676]">({note})</span>
        )}
      </span>
    </div>
  );
}

export function PropertyInfo({
  propertySpecsLeft = [
    { label: "Bedroom", value: "3" },
    { label: "Full Baths", value: "2" },
    { label: "Half Baths", value: "1" },
  ],
  propertySpecsRight = [
    { label: "Sq. Footage", value: "1850" },
    { label: "Lot Size (Acres)", value: "0.25" },
    { label: "Year Built", value: "1886" },
  ],
  components = [
    { label: "Roof", value: "Good Condition", note: "8 years old" },
    { label: "HVAC", value: "Functional", note: "4 years old" },
    { label: "Plumbing", value: "Copper/PEX", note: "Updated 2018" },
  ],
  hoaFee = "$150/mo",
  hoaAmenities = ["Pool", "Clubhouse", "Gym", "Common area maintenance"],
  closingPreferences = [
    { label: "Title Company", value: "Preferred title co" },
    { label: "Closing Date", value: "24 June 2026" },
    { label: "Occupancy", value: "At Closing" },
  ],
}: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard
          icon={<PropertySpecificationsIcon className="size-5 text-[#1F4E8B]" />}
          title="Property Specifications"
        >
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              {propertySpecsLeft.map((item, i) => (
                <SpecRow key={i} {...item} />
              ))}
            </div>
            <div>
              {propertySpecsRight.map((item, i) => (
                <SpecRow key={i} {...item} />
              ))}
            </div>
          </div>
        </InfoCard>

        <InfoCard
          icon={<MajorComponentsIcon className="size-5 text-[#1F4E8B]" />}
          title="Major Components"
        >
          {components.map((item, i) => (
            <div key={i}>
              <SpecRow {...item} />
              {i !== components.length - 1 && (
                <div className="h-px bg-[#DEDEDE]"></div>
              )}
            </div>
          ))}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard
          icon={<HomeIcon className="size-5 text-[#1F4E8B]" />}
          title="HOA Details"
        >
          <SpecRow label="Monthly Fee" value={hoaFee} />
          <div className="h-px bg-[#DEDEDE]"></div>
          <div className="pt-2">
            <span className="text-sm text-[#594139]">Amenities</span>
            <p className="mt-1 text-sm text-[#594139]">
              Includes: {hoaAmenities.join(", ")}
            </p>
          </div>
        </InfoCard>

        <InfoCard
          icon={<ClosingPreferencesIcon className="size-5 text-[#1F4E8B]" />}
          title="Closing Preferences"
        >
          {closingPreferences.map((item, i) => (
            <div key={i}>
              <SpecRow {...item} />
              {i !== closingPreferences.length - 1 && (
                <div className="h-px bg-[#DEDEDE]"></div>
              )}
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  );
}