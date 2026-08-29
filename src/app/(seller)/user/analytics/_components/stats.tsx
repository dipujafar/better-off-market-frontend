import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Handshake } from "lucide-react";

export default function Stats({
  totalOffersReceived,
  totalViewsThisWeek,
  loading,
}: {
  totalOffersReceived?: number;
  totalViewsThisWeek?: number;
  loading?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className=" rounded-lg p-6  shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-[#FF6A351A] rounded-sm">
            <Eye color="#AC3400" />
          </div>
        </div>
        <div>
          <p className=" text-primary-gray font-medium">
            Total views this week
          </p>
        </div>
        {loading ? (
          <Skeleton className="w-24 h-9 bg-gray-300" />
        ) : (
          <p className="text-4xl font-bold text-primary-black mt-1">{totalViewsThisWeek || 0}</p>
        )}
      </div>

      <div className=" rounded-lg p-6  shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-[#DAE2FD33] rounded-sm">
            <Handshake color="#565E74" />
          </div>
        </div>
        <div>
          <p className=" text-primary-gray font-medium">
            Total offers received
          </p>
        </div>
        {loading ? (
          <Skeleton className="w-24 h-9 bg-gray-300" />
        ) : (
          <p className="text-4xl font-bold text-primary-black mt-1">{totalOffersReceived || 0}</p>
        )}
      </div>
    </div>
  );
}
