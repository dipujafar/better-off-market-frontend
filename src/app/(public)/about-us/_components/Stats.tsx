"use client";
import Container from "@/components/shared/container/Container";
import CCountUp from "@/components/shared/utils/CCountUp";
import { Skeleton } from "@/components/ui/skeleton";
import { DealsIcon, ListingIcon, PeopleIcon } from "@/icons";
import { useGetStatsQuery } from "@/redux/api/statsApi";

export default function Stats() {
  const { data, isLoading } = useGetStatsQuery(undefined);

  console.log(data?.data);

  const StatsData = [
    {
      title: "ACTIVE LISTINGS",
      icon: <ListingIcon />,
      amount: data?.data?.activeListings,
    },
    {
      title: "REGISTERED USERS",
      icon: <PeopleIcon />,
      amount: data?.data?.registeredUsers,
    },
    {
      title: "DEALS CLOSED",
      icon: <DealsIcon />,
      amount: data?.data?.dealsClosed,
    },
  ];

  return (
    <Container className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2 py-16 ">
      {StatsData.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center md:gap-3 gap-2 bg-[#FFFFFF] border border-[#0E4D9114] py-10 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
        >
          <div className="rounded-full">{stat.icon}</div>
          <h3 className="lg:text-5xl md:text-3xl text-2xl  text-primary-black">
            {" "}
           { isLoading ? <Skeleton className="w-24 h-9 bg-gray-300  inline-block" /> : <CCountUp end={stat?.amount} />}
            {!isLoading && stat?.title === "REGISTERED USERS" && "+"}
          </h3>
          <p className="md:text-sm text-xs text-primary-gray font-medium">
            {stat?.title}
          </p>
        </div>
      ))}
    </Container>
  );
}
