'use client';

import { Heart, Home, Ruler, Bath } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface PropertyCardProps {
  image?: string;
  timeMin?: number;
  price: number;
  arv?: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

export function PropertyCard({
  image = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d9KVnwAZjfLmCxiwfRN8RnhxJzUIzP.png',
  timeMin = 10,
  price,
  arv,
  address,
  beds,
  baths,
  sqft,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

  const formattedArv = arv
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(arv)
    : null;

  const formattedSqft = new Intl.NumberFormat('en-US').format(sqft);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-56 w-full bg-gray-200">
        <Image
          src={image}
          alt={address}
          fill
          className="object-cover"
        />

        {/* Time Badge */}
        {timeMin && (
          <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {timeMin} min
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 transition-all hover:bg-white"
          aria-label="Add to favorites"
        >
          <Heart
            size={20}
            className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Content Container */}
      <div className="space-y-4 p-4">
        {/* Price Section */}
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {formattedPrice}
            {formattedArv && (
              <span className="text-base font-normal text-gray-600">
                {' '}
                (ARV: {formattedArv})
              </span>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-start gap-2">
          <Home size={18} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <p className="text-sm font-medium text-gray-700 line-clamp-2">{address}</p>
        </div>

        {/* Property Details */}
        <div className="flex gap-6 border-t border-gray-200 pt-4">
          {/* Beds */}
          <div className="flex items-center gap-2">
            <Home size={16} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Beds</p>
              <p className="font-semibold text-gray-900">{beds}</p>
            </div>
          </div>

          {/* Baths */}
          <div className="flex items-center gap-2">
            <Bath size={16} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Bath</p>
              <p className="font-semibold text-gray-900">{baths}</p>
            </div>
          </div>

          {/* Sqft */}
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Sqft</p>
              <p className="font-semibold text-gray-900">{formattedSqft}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
