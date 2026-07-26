import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileCardProps {
  image: string;
  name: string;
  title: string;
  rating: number;
  memberSince: string;
  listings: number;
}

export default function ProfileCard({
  image,
  name,
  title,
  rating,
  memberSince,
  listings,
}: ProfileCardProps) {
  return (
    <div className="w-full  bg-white rounded-lg  lg:p-6 p-4 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] border border-[#FAEEEA]">
      <div className="flex gap-4">
        {/* Profile Image */}
        <div className="shrink-0">
          <Link href="/seller-profile">
            <Image
              src={image}
              alt={name}
              width={1200}
              height={1200}
              className="size-20 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href="/seller-profile">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              </Link>
              <p className="text-sm text-[#434655] font-semibold">{title}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-5 h-5 fill-[#1F4E8B] text-[#1F4E8B]" />
            <span className="text-base font-semibold text-[#1F4E8B]">
              {rating.toFixed(1)} rating
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">Member since {memberSince}</span>
        <span className="font-semibold text-gray-900">{listings} listings</span>
      </div>

      {/* View Profile Link */}
      <Link href="/seller-profile">
        <button className="mt-4 w-full text-center text-[#1F4E8B] font-semibold hover:text-blue-900 transition-colors cursor-pointer">
          View profile
        </button>
      </Link>
    </div>
  );
}
