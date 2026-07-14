"use client";
import Link from "next/link";
import { useState } from "react";

interface Property {
  id: string;
  title: string;
  location: string;
  views: number;
}

const PROPERTIES_DATA: Property[] = [
  {
    id: "1",
    title: "3bd house",
    location: "Memphis, TN",
    views: 48,
  },
  {
    id: "2",
    title: "Duplex",
    location: "Nashville, TN",
    views: 67,
  },
  {
    id: "3",
    title: "Land",
    location: "Tulsa, OK",
    views: 31,
  },
  {
    id: "4",
    title: "Condo",
    location: "Phoenix, AZ",
    views: 27,
  },
  {
    id: "5",
    title: "Commercial",
    location: "Dallas, TX",
    views: 18,
  },
];

export default function Analytics() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [activeTab, setActiveTab] = useState("views");

  // Generate last 5 years (2021-2025)
  const currentYear = 2025;
  const years = Array.from({ length: 5 }, (_, i) =>
    String(currentYear - i),
  ).reverse();

  const maxViews = Math.max(...PROPERTIES_DATA.map((p) => p.views));
  return (
    <div className="bg-white shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] p-6">
      {/* Header with tabs and year selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <button
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
          onChange={(e) => setSelectedYear(e.target.value)}
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
      <div className="space-y-6">
        {PROPERTIES_DATA.map((property) => (
          <div key={property.id}>
            <div className="flex items-center justify-between mb-2">
              <Link href={`/property/${property.id}`} className="text-sm font-semibold text-primary-black">
                {property.title} — {property.location}
              </Link>
              <span className="text-sm font-medium text-primary-gray">
                {property.views} views
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#1F4E8B] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(property.views / maxViews) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
