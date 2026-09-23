"use client";
import { useGetSellerListingAnalyticsQuery } from "@/redux/api/profileApi";
import { useState } from "react";
import Stats from "./stats";
import Analytics from "./analytics";



export default function AnalyticsContainer() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { data, isLoading } = useGetSellerListingAnalyticsQuery({
    year: selectedYear,
  });

  const stats = data?.data;

  return (
    <div className="space-y-8">
      <h4 className="lg:text-[32px] md:text-3xl text-2xl font-semibold">
        Listing Analytics
      </h4>
      {/* ============================= analytics cards =========================== */}
      <Stats
        totalViewsThisWeek={stats?.totalViewsThisWeek}
        totalOffersReceived={stats?.totalOffersReceived}
        loading={isLoading}
      />
      <Analytics
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        data={stats}
        loading={isLoading}
      />
    </div>
  );
}
