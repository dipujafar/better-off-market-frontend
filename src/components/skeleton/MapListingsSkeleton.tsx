// components/property/MapListingsSkeleton.tsx
export default function MapListingsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Filter bar */}
      <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-[#F3F4F6] p-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-20 rounded bg-gray-300" />
            <div className="h-10 w-full rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Map area */}
        <div className="relative h-100 w-full bg-gray-200 lg:h-[calc(100vh-140px)] lg:flex-1">
          {/* Fake price pin placeholders scattered around */}
          <div className="absolute left-[15%] top-[45%] h-7 w-16 rounded-full bg-gray-300" />
          <div className="absolute left-[55%] top-[20%] h-7 w-16 rounded-full bg-gray-300" />
          <div className="absolute left-[65%] top-[55%] h-7 w-16 rounded-full bg-gray-300" />
          <div className="absolute left-[40%] top-[70%] h-7 w-16 rounded-full bg-gray-300" />

          {/* Zoom control placeholder */}
          <div className="absolute bottom-4 right-4 h-16 w-8 rounded-md bg-gray-300" />
        </div>

        {/* Right sidebar listings */}
        <div className="w-full space-y-6 overflow-y-auto p-4 lg:h-[calc(100vh-140px)] lg:w-95 lg:shrink-0">
          {/* Heading */}
          <div className="h-7 w-56 rounded bg-gray-300" />

          {Array.from({ length: 3 }).map((_, i) => (
            <PropertySidebarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertySidebarCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-200">
        <div className="absolute top-3 left-3 h-6 w-20 rounded-full bg-gray-300" />
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-300" />
        <div className="absolute bottom-3 left-3 h-6 w-24 rounded-full bg-gray-300" />
      </div>

      {/* Price row */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-16 rounded bg-gray-200" />
        <div className="h-5 w-14 rounded bg-gray-200" />
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>

      {/* Title */}
      <div className="h-5 w-4/5 rounded bg-gray-200" />

      {/* Stats row */}
      <div className="flex items-center gap-4">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-4 w-14 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}