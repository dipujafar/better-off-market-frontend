// components/skeleton/CounterOfferEditorSkeleton.tsx
export default function CounterOfferEditorSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Page title */}
      <div className="h-8 w-64 rounded bg-gray-200 mb-4" />

      {/* Property summary bar */}
      <div className="flex items-center gap-4 rounded-lg bg-[#F2F4F6] p-4 mb-6">
        <div className="h-16 w-24 shrink-0 rounded-lg bg-gray-200" />
        <div className="space-y-2">
          <div className="h-6 w-28 rounded bg-gray-200" />
          <div className="h-4 w-48 rounded bg-gray-200" />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SectionSkeleton fieldCount={4} />
          <SectionSkeleton fieldCount={2} />
          <SectionSkeleton fieldCount={2} pillLayout="contingency" />
          <SectionSkeleton fieldCount={2} title />
          <SectionSkeleton fieldCount={2} pillLayout="pills" />
          <SectionSkeleton fieldCount={3} />

          {/* Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="h-11 w-24 rounded-md bg-gray-200" />
            <div className="h-11 w-40 rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="flex flex-col gap-6">
          {/* Notes */}
          <SectionSkeleton fieldCount={1} />

          {/* Documents */}
          <div className="rounded-lg border border-primary-border-color p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
            </div>
            <div className="h-11 w-full rounded-md bg-gray-100" />
            <div className="h-11 w-full rounded-md bg-gray-100" />
          </div>

          {/* Seller profile card */}
          <div className="rounded-lg border border-primary-border-color p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-3.5 w-16 rounded bg-gray-200" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-3.5 w-24 rounded bg-gray-200" />
              <div className="h-3.5 w-16 rounded bg-gray-200" />
            </div>
            <div className="mt-3 h-3.5 w-20 rounded bg-gray-200" />
          </div>

          {/* Mobile-only action buttons */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="h-11 w-24 rounded-lg bg-gray-200" />
            <div className="h-11 w-40 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionSkeleton({
  fieldCount,
  pillLayout,
  title,
}: {
  fieldCount: number;
  pillLayout?: "pills" | "contingency";
  title?: boolean;
}) {
  return (
    <div className="rounded-lg border border-primary-border-color p-4 space-y-4">
      {/* Header row: icon + title + Edit link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-200" />
          <div className="h-5 w-32 rounded bg-gray-200" />
        </div>
        <div className="h-4 w-10 rounded bg-gray-200" />
      </div>

      {pillLayout === "pills" ? (
        <div className="flex flex-wrap justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="h-6 w-28 rounded-full bg-gray-200" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-6 w-32 rounded-full bg-gray-200" />
          </div>
        </div>
      ) : pillLayout === "contingency" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-3 w-16 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {Array.from({ length: fieldCount }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className={`h-4.5 rounded bg-gray-200 ${title ? "w-32" : "w-24"}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}