// components/skeleton/OfferListCardSkeleton.tsx
export default function OfferListCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 bg-white border-primary-border-color animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2">
        <div className="flex-1 flex flex-col lg:flex-row items-center md:gap-6 gap-3">
          {/* Property Image — matches lg:w-28 w-36 h-24 */}
          <div className="shrink-0">
            <div className="lg:w-28 w-36 h-24 rounded-lg bg-gray-200" />
          </div>

          {/* Property Info — matches md:grid-cols-4 grid-cols-2 */}
          <div className="flex-1 min-w-0 w-full">
            <div className="mt-4 grid md:grid-cols-4 grid-cols-2 items-center md:gap-4 gap-2">
              {/* Property type + address */}
              <div className="space-y-2">
                <div className="h-6 w-28 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
              </div>

              {/* Submitted date */}
              <div className="space-y-2">
                <div className="h-3.5 w-16 rounded bg-gray-200" />
                <div className="h-4.5 w-24 rounded bg-gray-200" />
              </div>

              {/* Offer amount */}
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-gray-200" />
                <div className="h-7 w-20 rounded bg-gray-200" />
              </div>

              {/* Status badge */}
              <div>
                <div className="h-6 w-24 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Status and Actions — right-aligned buttons */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <div className="h-9 w-24 rounded-md bg-gray-200" />
            <div className="h-9 w-28 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}