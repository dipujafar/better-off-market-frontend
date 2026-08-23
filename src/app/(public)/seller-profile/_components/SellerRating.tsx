import { IRatingBreakdown } from "@/types";

interface RatingSummaryProps {
  averageRating?: number;
  totalReviews?: number;
  breakdown?: IRatingBreakdown[];
}

const DEFAULT_BREAKDOWN: IRatingBreakdown[] = [
  { star: 5, count: 0 },
  { star: 4, count: 0 },
  { star: 3, count: 0 },
  { star: 2, count: 0 },
  { star: 1, count: 0 },
];

export function SellerRating({
  averageRating = 0,
  totalReviews = 0,
  breakdown = DEFAULT_BREAKDOWN,
}: RatingSummaryProps) {
  const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div className="rounded-md bg-white p-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Left: Average Rating */}
        <div className="flex shrink-0 flex-col items-center justify-center border-gray-200 sm:border-r sm:pr-8">
          <span className="text-5xl font-bold text-primary-black">
            {averageRating.toFixed(1)}
          </span>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                filled={i <= Math.floor(averageRating)}
                half={
                  i === Math.ceil(averageRating) &&
                  !Number.isInteger(averageRating)
                }
              />
            ))}
          </div>
          <span className="mt-2 text-sm text-gray-500">
            {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
          </span>
        </div>

        {/* Right: Breakdown Bars */}
        <div className="flex-1 space-y-3 sm:pl-8">
          {[...breakdown]
            .sort((a, b) => b.star - a.star)
            .map((item) => (
              <div key={item.star} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-sm text-primary-black">
                  {item.star} {item.star === 1 ? "star" : "stars"}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#F19C1F]"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-4 shrink-0 text-right text-sm text-gray-600">
                  {item.count}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  const id = `half-star-${Math.random().toString(36).slice(2)}`;
  if (half) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#F19C1F" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${id})`}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#F19C1F" : "#e5e7eb"}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}