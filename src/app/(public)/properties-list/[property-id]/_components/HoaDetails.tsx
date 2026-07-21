import { Building2, Waves, Users, Sprout } from "lucide-react";

type HoaFeature = {
  label: string;
  icon: React.ReactNode;
};

interface HoaDetailsProps {
  monthlyFee: number;
  features?: HoaFeature[];
}

const defaultFeatures: HoaFeature[] = [
  { label: "Pool", icon: <Waves className="size-4" /> },
  { label: "Clubhouse", icon: <Users className="size-4" /> },
  { label: "Landscaping", icon: <Sprout className="size-4" /> },
];

export default function HoaDetails({
  monthlyFee,
  features = defaultFeatures,
}: HoaDetailsProps) {
  return (
    <div className="rounded-2xl bg-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Building2 className="size-6 text-slate-900" />
        <h3 className="text-2xl font-semibold text-slate-900">HOA Details</h3>
      </div>

      {/* Monthly fee */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-lg text-[#a97a63]">Monthly Fee</span>
        <span className="text-xl font-medium text-slate-900">
          ${monthlyFee}/mo
        </span>
      </div>

      {/* Includes */}
      <div className="mt-6">
        <span className="text-lg text-[#a97a63]">Includes:</span>

        <div className="mt-3 flex flex-wrap gap-3">
          {features.map((feature) => (
            <span
              key={feature.label}
              className="flex items-center gap-2 rounded-full border border-[#e6c6b8] bg-white px-4 py-2 text-slate-800"
            >
              <span className="text-slate-900">{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}