import { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

export function StatsCard({ data }: { data: StatItem }) {
  const { icon: Icon, label, value } = data;
  return (
    <div className="bg-white rounded-lg border border-primary-border-color p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-primary-gray  mb-2">{label}</p>
          <p className="text-3xl font-bold text-primary-black">{value}</p>
        </div>
        <Icon className="w-6 h-6 text-primary-color" />
      </div>
    </div>
  );
}
