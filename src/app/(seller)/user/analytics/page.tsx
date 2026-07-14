import Analytics from "./_components/analytics";
import Stats from "./_components/stats";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h4 className="lg:text-[32px] md:text-3xl text-2xl font-semibold">
        Listing Analytics
      </h4>
      {/* ============================= analytics cards =========================== */}
      <Stats />
      <Analytics />
    </div>
  );
}
