"use client";

import Share from "@/components/utils/share";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";

export function ActionBtns() {
  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-white lg:p-6 p-4 shadow-[0_20px_50px_0_rgba(15,23,42,0.10)] space-y-4">
      <h2 className="lg:text-2xl text-xl font-bold text-black">
        Interested in this property?
      </h2>

      {/* Submit an offer button */}
      <button className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Submit an offer
      </button>

      {/* Message seller button */}
      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Message seller
      </button>

      {/* Share This Listing button */}
      <Share title="property-details" link="/properties-list/1">
        <button className="w-full border-2 border-primary-gray hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 duration-500 cursor-pointer">
          <Share2 size={20} />
          Share This Listing
        </button>
      </Share>

      {/* Save property button */}
      <button className="w-full border-2 border-primary-gray hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 duration-500 cursor-pointer">
        <Heart size={20} />
        Save property
      </button>

      {/* Info box */}
      <div className="border-l-4 border-primary-color bg-[#F2F4F6] p-4 space-y-1">
        <p className="text-sm text-gray-800">
          You need a free account to submit offers or message sellers.{" "}
          <Link
            href="#"
            className="text-[#1F4E8B] hover:underline font-semibold"
          >
            Sign up free
          </Link>{" "}
          or{" "}
          <Link
            href="#"
            className="text-[#1F4E8B] hover:underline font-semibold"
          >
            log in
          </Link>
        </p>
      </div>
    </div>
  );
}
