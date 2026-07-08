import Container from "@/components/shared/container/Container";
import CCountUp from "@/components/shared/utils/CCountUp";
import { DealsIcon, ListingIcon, PeopleIcon } from "@/icons";

const StatsData = [
  {
    title: "ACTIVE LISTINGS",
    icon: <ListingIcon />,
    amount:  535,
  },
  {
    title: "REGISTERED USERS",
    icon: <PeopleIcon />,
    amount: 2400,
  },
  {
    title: "DEALS CLOSED",
    icon: <DealsIcon />,
    amount: 318,
  },
];

export default function Stats() {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-4 py-16 ">
      {StatsData.map((stat, index) => (
        <div key={index} className="flex flex-col items-center gap-3 bg-[#FFFFFF] border border-[#0E4D9114] py-10 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <div className="rounded-full">{stat.icon}</div>
          <h3 className="text-5xl  text-primary-black"> <CCountUp end={stat.amount} /> { stat.title === "REGISTERED USERS" &&   "+"}</h3>
          <p className="text-sm text-primary-gray font-medium">{stat.title}</p>
        </div>
      ))}
    </Container>
  );
}
