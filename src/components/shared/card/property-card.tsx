'use client';

import { IProperty } from '@/types';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export function PropertyCard({
  imageUrl,
  timeEstimate,
  price,
  arv,
  address,
  beds,
  baths,
  sqft
}: IProperty) {
  // const [favorited, setFavorited] = useState(isFavorited);

  // const handleFavoriteClick = () => {
  //   const newState = !favorited;
  //   setFavorited(newState);
  //   onFavoriteClick?.(newState);
  // };

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <div className="w-full  rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={address}
          className="w-full h-full object-cover"
        />

        {/* Time Badge */}
        <div className="absolute top-3 left-3 bg-gray-800 text-white px-2.5 py-1 rounded-md text-sm font-semibold">
          {timeEstimate}
        </div>

        {/* Favorite Button */}
        <button
          // onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart
            size={20}
            className={
              // favorited ? 'fill-red-500 text-red-500' : 
              'text-gray-400'}
          />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="space-y-1">
          <p className="text-2xl font-bold text-blue-600">
            {priceFormatter.format(price)}
            {arv && (
              <span className="text-gray-600 text-sm font-normal ml-2">
                (ARV: {priceFormatter.format(arv)})
              </span>
            )}
          </p>
        </div>

        {/* Address */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {address}
        </h3>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-gray-700 pt-1">
          <div className="flex items-center gap-1">
            <span className="text-sm">🛏️</span>
            <span className="text-sm font-semibold">{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">🚿</span>
            <span className="text-sm font-semibold">{baths} Bath</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm">📐</span>
            <span className="text-sm font-semibold">
              {(sqft / 1000).toFixed(0)}k sqft
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
