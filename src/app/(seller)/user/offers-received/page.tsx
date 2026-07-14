import { CircleAlert } from "lucide-react";
import OfferListContainer from "./_components/OfferListContainer";

export default function OffersReceivedPage() {
  return (
    <div>
      {/* ===========================  page title =============================*/}
      <div className="flex-between flex-wrap gap-1">
        <h4 className="lg:text-[32px] md:text-3xl text-2xl font-semibold">
         Offers Received
        </h4>
        <div className="flex gap-1 items-center text-sm text-primary-gray">
          <CircleAlert size={20} />
          <p>Track your active proposals and history.</p>
        </div>
      </div>
      {/* ===========================  page offer list =============================*/}
      <div className="py-4 border-b border-primary-border-color">
        <OfferListContainer />
      </div>
    </div>
  );
}
