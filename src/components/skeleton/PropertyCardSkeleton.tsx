// components/property/PropertyCardSkeleton.tsx
export default function PropertyCardSkeleton() {
  return (
    <div className="w-full  rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      {/* Image area */}
      <div className="relative h-64 bg-gray-200">
        {/* Top-left badge (e.g. "5 min") */}
        <div className="absolute top-4 left-4 h-7 w-16 rounded-full bg-gray-300" />
        {/* Top-right heart icon */}
        <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-gray-300" />
        {/* Bottom-left badge (e.g. "Residential") */}
        <div className="absolute bottom-4 left-4 h-7 w-24 rounded-full bg-gray-300" />
      </div>

      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Price row */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-28 rounded bg-gray-200" />
          <div className="h-5 w-24 rounded bg-gray-200" />
        </div>

        {/* Address */}
        <div className="h-6 w-4/5 rounded bg-gray-200" />

        {/* Stats row: beds / bath / sqft */}
        <div className="flex items-center gap-4 pt-1">
          <div className="h-4 w-14 rounded bg-gray-200" />
          <div className="h-4 w-14 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}