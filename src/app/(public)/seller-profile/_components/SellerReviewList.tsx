interface Review {
  id: string | number;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewListProps {
  reviews?: Review[];
}

export function SellerReviewList({
  reviews = [
    {
      id: 1,
      name: "Michael B.",
      date: "Jun 10, 2026",
      rating: 5,
      comment:
        "James is a true professional. The closing on the Memphis property was seamless and he kept me updated every step of the way. Highly recommended for anyone looking for off-market deals.",
    },
    {
      id: 2,
      name: "Sarah L.",
      date: "May 28, 2026",
      rating: 5,
      comment:
        "Great experience purchasing land in Tulsa. James provided all the necessary documentation upfront and the title was indeed clear as promised. Will definitely work with him again.",
    },
  ],
}: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-md bg-white p-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Avatar Initials */}
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-primary-gray">
                {getInitials(review.name)}
              </div>
              <div>
                <p className="font-semibold text-primary-black">
                  {review.name}
                </p>
                <p className="text-sm text-[#594139] font-semibold">{review.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex shrink-0 gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon  key={i} filled={i <= review.rating} />
              ))}
            </div>
          </div>

          <p className="mt-4 text-[#594139] text-lg">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#fb923c" : "#e5e7eb"}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}