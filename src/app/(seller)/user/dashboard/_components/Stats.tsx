import { StatsCard } from "@/components/shared/card/stat-card";
import { Briefcase, Tag, Eye } from "lucide-react";
const statsData = [
  {
    label: "Active listings",
    value: 12,
    icon: Briefcase,
  },
  {
    label: "New offers",
    value: 4,
    icon: Tag,
  },
  {
    label: "Total views this week",
    value: 284,
    icon: Eye,
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
