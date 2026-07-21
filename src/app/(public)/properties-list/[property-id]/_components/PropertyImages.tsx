"use client";
import Preview from "@/components/shared/utils/image_preview_option";
import ImagePreviewer from "@/components/shared/utils/images-previewer";
import Share from "@/components/utils/share";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PropertyImages() {
  const [previewImgIndex, setPreviewImgIndex] = useState(-1);

  const images = [
    "/properties/property_details_image_1.png",
    "/properties/property_details_image_2.png",
    "/properties/property_details_image_3.png",
    "/properties/property_details_image_4.png",
    "/properties/property_details_image_5.png",
    "/properties/property_image_1.png",
    "/properties/property_image_2.png",
    "/properties/property_image_3.png",
  ];
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-2 sm:gap-4">
        {/* Main image */}
        <div className="col-span-2 lg:col-span-2 lg:row-span-2 relative">
          <Preview onClick={() => setPreviewImgIndex(0)}>
            <Image
              src="/properties/property_details_image_1.png"
              alt="property_image_1"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-60 sm:max-h-80 lg:max-h-125 rounded-xl lg:rounded-l-xl lg:rounded-r-none"
            />
          </Preview>
          <span className="absolute top-3 left-3 sm:top-4.5 sm:left-5 text-xs font-bold text-primary-color bg-white py-1.5 px-3 sm:py-2 rounded-full uppercase">
            Residential
          </span>

          {/* Mobile-only Share (desktop share sits on image 3) */}
          <div className="sm:hidden">
            <Share
              title="property-details"
              link="/properties-list/1"
              className="absolute right-3 top-3 bg-primary-color text-white z-50 cursor-pointer hover:bg-primary-color/80"
            />
          </div>
        </div>

        {/* Image 2 — visible on ALL sizes */}
        <div className="col-span-1 lg:col-start-3 lg:row-start-1">
          <Preview onClick={() => setPreviewImgIndex(1)}>
            <Image
              src="/properties/property_details_image_2.png"
              alt="property_image_2"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-32 sm:max-h-40 lg:max-h-60.5"
            />
          </Preview>
        </div>

        {/* Image 3 — visible on ALL sizes, carries "show all" on mobile, Share on lg */}
        <div className="col-span-1 lg:col-start-4 lg:row-start-1 relative">
          <Preview onClick={() => setPreviewImgIndex(2)}>
            <Image
              src="/properties/property_details_image_3.png"
              alt="property_image_3"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-32 sm:max-h-40 lg:max-h-60.5 lg:rounded-tr-xl"
            />
          </Preview>

          {/* Mobile: show all photos overlay */}
          <div
            onClick={() => setPreviewImgIndex(5)}
            className="lg:hidden bg-white/90 flex items-center gap-1 absolute bottom-2 right-2 px-2 py-1.5 text-xs sm:text-sm font-medium rounded-md z-50 cursor-pointer"
          >
            <LayoutGrid size={14} className="sm:w-4 sm:h-4" /> Show all photos
          </div>

          {/* Desktop Share button */}
          <div className="hidden lg:block">
            <Share
              title="property-details"
              link="/properties-list/1"
              className="absolute right-4 top-4 bg-primary-color text-white z-999 cursor-pointer hover:bg-primary-color/80"
            />
          </div>
        </div>

        {/* Image 4 — hidden on mobile, visible sm+ */}
        <div className="hidden sm:block lg:col-start-3 lg:row-start-2">
          <Preview onClick={() => setPreviewImgIndex(3)}>
            <Image
              src="/properties/property_details_image_4.png"
              alt="property_image_4"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-40 lg:max-h-60.5"
            />
          </Preview>
        </div>

        {/* Image 5 — hidden on mobile, visible sm+ */}
        <div className="hidden sm:block lg:col-start-4 lg:row-start-2 relative">
          <Preview onClick={() => setPreviewImgIndex(4)}>
            <Image
              src="/properties/property_details_image_5.png"
              alt="property_image_5"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-40 lg:max-h-60.5 lg:rounded-br-xl"
            />
          </Preview>
          <div
            onClick={() => setPreviewImgIndex(5)}
            className="bg-white/90 flex items-center gap-1 absolute bottom-2 right-2 lg:bottom-4 lg:right-4 px-2 py-1.5 text-sm font-medium rounded-md z-999 cursor-pointer"
          >
            <LayoutGrid size={16} /> Show all photos
          </div>
        </div>
      </div>

      <div>
        <ImagePreviewer
          imageUrls={images}
          previewImgIndex={previewImgIndex}
          setPreviewImgIndex={setPreviewImgIndex}
        />
      </div>
    </>
  );
}
