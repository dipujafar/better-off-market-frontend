import { cn } from "@/lib/utils";

export function NotificationsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[#C4C7C780] bg-white p-6",
        className,
      )}
    >
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#C4C7C780] px-5 py-4"
          >
            <div className="flex justify-between gap-1.5">
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-3 w-16 shrink-0 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}