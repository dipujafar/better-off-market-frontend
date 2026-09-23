import OfferListContainer from "@/app/(buyer)/my-offer/_components/OfferListContainer";
import { CircleAlert } from "lucide-react";

export const metadata = {
  title: "My Offers",
  description: "Find your all offed properties",
};

export default function MyOfferPage() {
  return (
    <div>
      {/* ===========================  page title =============================*/}
      <div className="flex-between flex-wrap gap-1">
        <h4 className=" md:text-2xl text-xl font-semibold">My Offers</h4>
        <div className="flex gap-1 items-center text-sm text-primary-gray">
          <CircleAlert size={20} />
          <p>Track your active proposals and history.</p>
        </div>
      </div>
      <OfferListContainer />
    </div>
  );
}
