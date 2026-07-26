"use client";

import Share from "@/components/utils/share";
import { Eye, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export function ActionBtns() {
  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-white lg:p-6 p-4 shadow-[0_20px_50px_0_rgba(15,23,42,0.10)] border border-[#FAEEEA] space-y-4">
      <h2 className="lg:text-2xl text-xl font-bold text-black">
        Interested in this property?
      </h2>

      {/* Submit an offer button */}
      <button className="w-full cursor-pointer bg-primary-color hover:bg-primary-color/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Submit an offer
      </button>

      {/* Message seller button */}
      <Link href="/message" className="block">
      <button className="w-full cursor-pointer bg-[#2D3133] hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
        Message seller
      </button>
      </Link>

      <div className="flex gap-2.5">
        <div className="flex-1">
          {/* Share This Listing button */}
          <Share title="property-details" link="/properties-list/1">
            <button className="w-full border-2 border-primary-gray hover:border-gray-400 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 duration-500 cursor-pointer">
              <Share2 size={20} />
              Share
            </button>
          </Share>
        </div>

        {/* Save property button */}
        <button className="w-full flex-1  border-2 border-primary-gray hover:border-gray-400  text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 duration-500 cursor-pointer hover:bg-red-500 hover:border-none group hover:text-white">
          <Heart
            size={20}
            className="group-hover:text-white group-hover:fill-white duration-500 transition-colors"
          />
          Save
        </button>
      </div>

      <div className="flex gap-1.5 justify-center">
        <span className="text-[#594139] flex items-center gap-1 ">
          <Eye /> 1,245 Views,
        </span>
        <span className="text-[#594139] flex items-center gap-1 ">
          Listed 42 days ago
        </span>
      </div>

      {/* Info box */}
      {/* <div className="border-l-4 border-primary-color bg-[#F2F4F6] p-4 space-y-1">
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
      </div> */}
    </div>
  );
}
