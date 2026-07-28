"use client";
import { useState } from "react";
import Preview from "../utils/image_preview_option";
import Image from "next/image";
import ImagePreviewer from "../utils/images-previewer";
import { cn } from "@/lib/utils";

export default function OfferPropertyCard({className}: {className?: string}) {
  const [previewImgIndex, setPreviewImgIndex] = useState(-1);

  const images = ["/properties/property_details_image_1.png"];

  return (
    <>
      <div className={cn("bg-[#F2F4F6] border border-[#E0E3E5] rounded-lg md:py-5 py-4 md:px-4 px-3 flex gap-4 items-center", className)}>
        <Preview className="text-sm" onClick={() => setPreviewImgIndex(0)}>
          <Image
            src={"/properties/property_details_image_1.png"}
            width={1200}
            height={1200}
            alt="property_image_1"
            className="rounded-md size-22 object-cover"
          />
        </Preview>
        <div>
          <h4 className="text-2xl font-semibold">$48,500</h4>
          <p className="text-primary-gray">3bd house — 1,450 sqft</p>
        </div>
      </div>
      <ImagePreviewer
        imageUrls={images}
        previewImgIndex={previewImgIndex}
        setPreviewImgIndex={setPreviewImgIndex}
      />
    </>
  );
}
