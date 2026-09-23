import Link from "next/link";
import Stats from "./_components/Stats";
import RecentProperties from "./_components/RecentProperties";
import RecentOffers from "./_components/RecentOffers";
import GreetingMessage from "./_components/GreetingMessage";

export const metadata = {
  title: "Dashboard",
  description: "Manage your properties and track their performance.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        {/* ===========================  page title ============================= */}
        <div>
          <GreetingMessage />
          <p className="text-primary-gray mt-1">
            Here's what's happening with your properties today.
          </p>
        </div>
        {/* ============================== stat cards =========================== */}
        <Stats />
      </div>
      {/* ============================= recent listings =========================== */}
      <div className="shadow-[-10px_0_30px_0_rgba(15,23,42,0.03)] bg-white border-l border-primary-border-color">
        {/* =========================== title ============================= */}
        <div className="lg:p-6 p-4 flex items-center justify-between border-b border-primary-border-color ">
          <h4 className="text-2xl font-semibold">Recent listings</h4>
          <Link
            href="/user/my-listings"
            className="text-[#AC3400] hover:font-bold duration-500 "
          >
            View all
          </Link>
        </div>
        <RecentProperties />
      </div>
      {/* ============================= recent offers =========================== */}
      <div>
        <h4 className="text-2xl font-semibold mb-4">Recent offers</h4>
        <RecentOffers />
      </div>
    </div>
  );
}
