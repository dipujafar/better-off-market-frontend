"use client";
import ViewsSavesSkeleton from "@/components/skeleton/ViewsSavesSkeleton";
import Empty from "@/components/ui/empty-data";
import Link from "next/link";
import { useState } from "react";

interface AnalyticsEntry {
  propertyId: string;
  label: string;
  count: number;
}

interface AnalyticsData {
  totalViewsThisWeek: number;
  totalOffersReceived: number;
  views: AnalyticsEntry[];
  maxViewsCount: number;
  saves: AnalyticsEntry[];
  maxSavesCount: number;
}

type TProps = {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  loading?: boolean;
  data?: AnalyticsData;
};

type ActiveTab = "views" | "saves";

export default function Analytics({
  selectedYear,
  setSelectedYear,
  data,
  loading,
}: TProps) {
  const currentYear = new Date().getFullYear();
  const [activeTab, setActiveTab] = useState<ActiveTab>("views");

  // Generate last 5 years
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();

  if (loading) return <ViewsSavesSkeleton />;

  const entries =
    activeTab === "views" ? (data?.views ?? []) : (data?.saves ?? []);
  const maxCount =
    activeTab === "views" ? data?.maxViewsCount || 1 : data?.maxSavesCount || 1;

  return (
    <div className="bg-white shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] p-6">
      {/* Header with tabs and year selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("views")}
            className={`px-6 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === "views"
                ? "bg-[#001a4d] text-white"
                : "bg-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Views
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saves")}
            className={`px-6 py-1 rounded-full font-medium transition-colors cursor-pointer ${
              activeTab === "saves"
                ? "bg-[#001a4d] text-white"
                : "bg-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Saves
          </button>
        </div>

        {/* Year selector */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-4 py-1.5 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 cursor-pointer hover:border-gray-400 transition-colors"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Properties list */}
      {entries.length === 0 ? (
        <Empty
          message={`No ${activeTab} properties for ${selectedYear} yet.`}
        />
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <div key={entry.propertyId}>
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/user/my-listings/${entry.propertyId}`}
                  className="text-sm font-semibold text-primary-black hover:underline"
                >
                  {entry.label}
                </Link>
                <span className="text-sm font-medium text-primary-gray">
                  {entry.count} {activeTab}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-[#1F4E8B] h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(entry.count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
