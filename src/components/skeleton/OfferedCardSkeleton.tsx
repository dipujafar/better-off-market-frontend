// components/skeleton/OfferedCardSkeleton.tsx
export default function OfferedCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-primary-border-color rounded-lg bg-white animate-pulse">
      {/* Property Image */}
      <div className="shrink-0 w-full sm:w-36 md:h-20 h-40 rounded-lg bg-gray-200" />

      {/* Property Information */}
      <div className="grow min-w-0 space-y-3">
        {/* Title */}
        <div className="h-4 w-48 rounded bg-gray-200" />

        {/* Location */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>

        {/* Status + Price row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-6 w-16 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center shrink-0 w-full sm:w-auto">
        <div className="h-11 w-full sm:w-32 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}