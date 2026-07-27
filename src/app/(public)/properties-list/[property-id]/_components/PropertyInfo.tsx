import { HomeIcon, ClosingPreferencesIcon, MajorComponentsIcon } from "@/icons";

interface SpecItem {
  label: string;
  value: string;
  note?: string; // e.g. "8 years old", "Updated 2018"
}

interface PropertyInfoProps {
  componentsLeft?: SpecItem[];
  componentsRight?: SpecItem[];
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
    <div className="rounded-lg bg-gray-100 p-6">
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
  componentsLeft = [
    { label: "Lot Size", value: "6,200 sqft" },
    { label: "HVAC", value: "Functional", note: "4 years old" },
    { label: "Plumbing", value: "Copper/PEX", note: "Updated 2018" },
  ],
  componentsRight = [
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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <InfoCard icon={<MajorComponentsIcon />} title="Major Components">
          {componentsLeft.map((item, i) => (
            <div key={i}>
              <SpecRow {...item} />
              {i !== componentsLeft.length - 1 && (
                <div className="h-px bg-[#DEDEDE]"></div>
              )}
            </div>
          ))}
        </InfoCard>

        <InfoCard icon={<MajorComponentsIcon />} title="Major Components">
          {componentsRight.map((item, i) => (
            <div key={i}>
              <SpecRow {...item} />
              {i !== componentsLeft.length - 1 && (
                <div className="h-px bg-[#DEDEDE]"></div>
              )}
            </div>
          ))}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <InfoCard icon={<HomeIcon />} title="HOA Details">
          <SpecRow label="Monthly Fee" value={hoaFee} />
          <div className="h-px bg-[#DEDEDE]"></div>
          <div className="pt-2">
            <span className="text-sm text-[#594139]">Amenities</span>
            <p className="mt-1 text-sm text-[#594139]">
              Includes: {hoaAmenities.join(", ")}
            </p>
          </div>
        </InfoCard>

        <InfoCard icon={<ClosingPreferencesIcon />} title="Closing Preferences">
          {closingPreferences.map((item, i) => (
            <div key={i}>
              <SpecRow {...item} />
              {i !== componentsLeft.length - 1 && (
                <div className="h-px bg-[#DEDEDE]"></div>
              )}
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  );
}
