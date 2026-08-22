export default function SellerProfileSkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-white p-5 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 sm:flex-row lg:gap-8">
        {/* Avatar */}
        <div className="size-20 shrink-0 rounded-lg bg-gray-200 sm:size-28 lg:size-40" />

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="h-8 w-40 rounded bg-gray-200 sm:h-7" />
          <div className="h-6 w-60 rounded bg-gray-200 sm:h-5 mt-1" />
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-2/3 rounded bg-gray-100" />
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200 sm:my-5" />

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-16">
            <div>
              <div className="h-3 w-24 rounded bg-gray-100" />
              <div className="mt-2 h-5 w-8 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-3 w-20 rounded bg-gray-100" />
              <div className="mt-2 h-5 w-8 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-3 w-16 rounded bg-gray-100" />
              <div className="mt-2 h-5 w-10 rounded bg-gray-200" />
            </div>

            <div>
              <div className="h-11 w-36 rounded-md bg-gray-200 lg:w-44" />
            </div>

            <div className="h-5 w-32 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}