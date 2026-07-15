'use client';

import { Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

export function ActionBtns() {
  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-white p-6 space-y-4">
      <h2 className="text-2xl font-bold text-black">Interested in this property?</h2>

      {/* Submit an offer button */}
      <button className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Submit an offer
      </button>

      {/* Message seller button */}
      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Message seller
      </button>

      {/* Share This Listing button */}
      <button className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Share2 size={20} />
        Share This Listing
      </button>

      {/* Save property button */}
      <button className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
        <Heart size={20} />
        Save property
      </button>

      {/* Info box */}
      <div className="border-l-4 border-blue-600 bg-blue-50 p-4 space-y-1">
        <p className="text-sm text-gray-800">
          You need a free account to submit offers or message sellers.{' '}
          <Link href="#" className="text-blue-600 hover:underline font-semibold">
            Sign up free
          </Link>
          {' '}or{' '}
          <Link href="#" className="text-blue-600 hover:underline font-semibold">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
}
