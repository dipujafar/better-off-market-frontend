import { StatsCard } from "@/components/shared/card/stat-card";
import { ActingListingIcon, NewOfferIcon, ViewIcon } from "@/icons";

const statsData = [
  {
    label: "Active listings",
    value: 12,
    icon: ActingListingIcon,
  },
  {
    label: "New offers",
    value: 4,
    icon: NewOfferIcon,
  },
  {
    label: "Total views this week",
    value: 284,
    icon: ViewIcon,
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-6 gap-4 mt-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} data={stat} />
      ))}
    </div>
  );
}
