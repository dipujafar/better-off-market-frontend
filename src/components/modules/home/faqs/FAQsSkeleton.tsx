export default function FAQsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4 mx-auto max-w-3xl animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] p-6"
        >
          <div className="flex items-center justify-between">
            <div
              className={`h-6 rounded bg-gray-200 ${i % 2 === 0 ? "w-3/4" : "w-1/2"}`}
            />
            <div className="ml-4 h-5 w-5 shrink-0 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}