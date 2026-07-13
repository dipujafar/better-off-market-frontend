import Link from "next/link";
import Stats from "./_components/Stats";
import RecentProperties from "./_components/RecentProperties";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        {/* ===========================  page title ============================= */}
        <div>
          <h4 className="md:text-[32px] text-2xl font-semibold text-primary-black">
            Good morning, James
          </h4>
          <p className="text-primary-gray mt-1">
            Here's what's happening with your properties today.
          </p>
        </div>
        {/* ============================== stat cards =========================== */}
        <Stats />
      </div>
      {/* ============================= recent listings =========================== */}
      <div className="shadow-[-10px_0_30px_0_rgba(15,23,42,0.03)] bg-white border-l border-[#E2BFB5]">
        {/* =========================== title ============================= */}
        <div className="lg:p-6 p-4 flex items-center justify-between border-b border-[#E2BFB5] ">
            <h4 className="text-2xl font-semibold">Recent listings</h4>
            <Link href="/user/listings" className="text-[#AC3400] hover:font-bold duration-500 ">View all</Link>
        </div>
        <RecentProperties />
      </div>
    </div>
  );
}
