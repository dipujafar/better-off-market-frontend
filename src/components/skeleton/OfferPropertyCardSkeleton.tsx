export default function OfferPropertyCardSkeleton() {
  return (
    <div
      className={
        "bg-[#F2F4F6] border border-[#E0E3E5] rounded-lg md:py-5 py-4 md:px-4 px-3 flex gap-4 items-center animate-pulse"
      }
    >
      {/* Thumbnail */}
      <div className="size-22 shrink-0 rounded-md bg-gray-200" />

      {/* Text content */}
      <div className="flex-1 space-y-2">
        <div className="h-7 w-20 rounded bg-gray-200" />
        <div className="h-4 w-56 rounded bg-gray-200" />
      </div>
    </div>
  );
}
