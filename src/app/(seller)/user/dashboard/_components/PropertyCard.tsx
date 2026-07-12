'use client'

import { Eye, Bookmark, Heart, Share2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface PropertyCardProps {
  image: string
  type: string
  location: string
  price: number
  views: number
  saved: number
  offers: number
}

export default function PropertyCard({
  image,
  type,
  location,
  price,
  views,
  saved,
  offers,
}: PropertyCardProps) {
  return (
    <div className="flex gap-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Image Section */}
      <div className="relative h-40 w-48 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={type}
          fill
          className="object-cover"
        />
        <div className="absolute left-3 top-3 rounded bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
          ACTIVE
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col">
        {/* Header with Type and Price */}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{type}</h3>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
              <span>📍</span>
              <span>{location}</span>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            ${price.toLocaleString()}
          </span>
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Eye size={18} className="text-gray-600" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark size={18} className="text-gray-600" />
            <span>{saved} Saved</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={18} className="text-gray-600" />
            <span>{offers} offers</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Edit Listing
          </Button>
          <Button
            variant="outline"
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Update Price
          </Button>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-2">
            <button className="rounded p-2 hover:bg-gray-100">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="rounded p-2 hover:bg-gray-100">
              <Trash2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
