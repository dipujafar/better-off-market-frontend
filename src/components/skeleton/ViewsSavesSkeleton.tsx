// components/skeleton/ViewsSavesSkeleton.tsx
export default function ViewsSavesSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full rounded-xl border border-gray-100 bg-white p-6 animate-pulse">
      {/* Header: tabs + year selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="h-9 w-20 rounded-full bg-gray-200" />
          <div className="h-9 w-16 rounded-full bg-gray-100" />
        </div>
        <div className="h-9 w-24 rounded-md bg-gray-200" />
      </div>

      {/* Rows */}
      <div className="space-y-6">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}