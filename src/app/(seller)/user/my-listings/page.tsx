import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MyListingContainer from "./_components/MyListingContainer";
import Link from "next/link";

export default function MyListingPage() {
  return (
    <div>
      {/* ============================= page title =========================== */}
      <div className="flex-between py-6 border-b border-primary-border-color">
        <div>
          <h1 className="text-2xl font-bold text-primary-black">My Listing</h1>
          <p className="text-primary-gray">
            Manage your properties and track their performance.
          </p>
        </div>
        <Link href={'/user/my-listings/property-listing'}>
          <Button  className="cursor-pointe px-3 py-4.5 text-base cursor-pointer bg-[#2D3133]">
            <Plus className="mr-0.5" /> Add Listing
          </Button>
        </Link>
      </div>
      {/* ============================== my listing list ======================= */}
      <MyListingContainer />
    </div>
  );
}
