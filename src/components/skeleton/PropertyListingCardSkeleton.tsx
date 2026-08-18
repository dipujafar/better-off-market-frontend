import { Skeleton } from "@/components/ui/skeleton";

export function PropertyListingCardSkeleton() {
  return (
    <div className="flex items-center gap-6 rounded-2xl border border-border bg-white p-4 shadow-sm">
      {/* Thumbnail */}
      <Skeleton className="h-34 w-40 shrink-0 rounded-xl" />

      {/* Middle: type, location, stats */}
      <div className="flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" /> {/* "Residential" */}
          <Skeleton className="h-3.5 w-32" /> {/* location */}
        </div>

        <div className="flex items-center gap-5">
          <Skeleton className="h-3.5 w-14" /> {/* views */}
          <Skeleton className="h-3.5 w-16" /> {/* saved */}
          <Skeleton className="h-3.5 w-14" /> {/* offers */}
          <Skeleton className="h-3.5 w-12" /> {/* rsvp */}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Skeleton className="h-9 w-27.5 rounded-lg" /> {/* Edit Listing */}
          <Skeleton className="h-9 w-25 rounded-lg" /> {/* Open House */}
          <Skeleton className="h-9 w-30 rounded-lg" /> {/* Update Price */}
        </div>
      </div>

      {/* Right: price + icons */}
      <div className="flex h-full flex-col items-end justify-between self-stretch">
        <Skeleton className="h-5 w-16" /> {/* price */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" /> {/* share icon */}
          <Skeleton className="h-4 w-4 rounded-full" /> {/* delete icon */}
        </div>
      </div>
    </div>
  );
}