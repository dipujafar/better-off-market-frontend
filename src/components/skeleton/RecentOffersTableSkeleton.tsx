// components/skeleton/RecentOffersTableSkeleton.tsx
export default function RecentOffersTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-100 animate-pulse">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 bg-[#F3F4F6] px-6 py-3">
        <div className="h-4 w-14 rounded bg-gray-300" />
        <div className="h-4 w-16 rounded bg-gray-300" />
        <div className="h-4 w-10 rounded bg-gray-300" />
        <div className="h-4 w-14 rounded bg-gray-300" />
        <div className="h-4 w-14 rounded bg-gray-300" />
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 items-center gap-4 border-t border-gray-100 px-6 py-4"
        >
          {/* Buyer */}
          <div className="space-y-1.5">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </div>

          {/* Amount */}
          <div className="h-4 w-20 rounded bg-gray-200" />

          {/* Time */}
          <div className="h-4 w-24 rounded bg-gray-200" />

          {/* Status */}
          <div className="h-6 w-16 rounded-full bg-gray-200" />

          {/* Action */}
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}