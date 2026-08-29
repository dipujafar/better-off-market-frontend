"use client";
import { StatsCard } from "@/components/shared/card/stat-card";
import { ActingListingIcon, NewOfferIcon, ViewIcon } from "@/icons";
import { useGetSellerDashboardStatsQuery } from "@/redux/api/profileApi";

export default function Stats() {
  const { data, isLoading } = useGetSellerDashboardStatsQuery(undefined);

  const stats = data?.data;

  const statsData = [
    {
      label: "Active listings",
      value: stats?.activeListings,
      icon: ActingListingIcon,
      loading: isLoading,
    },
    {
      label: "New offers",
      value: stats?.newOffers,
      icon: NewOfferIcon,
      loading: isLoading,
    },
    {
      label: "Total views this week",
      value: stats?.totalViewsThisWeek,
      icon: ViewIcon,
      loading: isLoading,
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-6 gap-4 mt-4">
      {statsData.map((stat, index) => (
        <StatsCard key={index} data={stat} />
      ))}
    </div>
  );
}
