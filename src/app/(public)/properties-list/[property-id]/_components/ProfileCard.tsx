import { Star } from 'lucide-react'

interface ProfileCardProps {
  image: string
  name: string
  title: string
  rating: number
  memberSince: string
  listings: number
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
    <div className="w-full  bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex gap-4">
        {/* Profile Image */}
        <div className="shrink-0">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-5 h-5 fill-blue-500 text-blue-500" />
            <span className="text-base font-semibold text-blue-600">
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
      <button className="mt-4 w-full text-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
        View profile
      </button>
    </div>
  )
}
