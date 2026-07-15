"use client";
import Preview from "@/components/shared/utils/image_preview_option";
import ImagePreviewer from "@/components/shared/utils/images-previewer";
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
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <div className="col-span-2 row-span-2 relative">
          <Preview onClick={() => setPreviewImgIndex(0)}>
            <Image
              src="/properties/property_details_image_1.png"
              alt="property_image_1"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-125 rounded-l-xl"
            />
          </Preview>
          <span className="absolute top-4.5 left-5 text-xs font-bold text-primary-color bg-white py-2 px-3 rounded-full uppercase">
            Residential
          </span>
        </div>
        <div className="col-start-3">
          <Preview onClick={() => setPreviewImgIndex(1)}>
            <Image
              src="/properties/property_details_image_2.png"
              alt="property_image_2"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-60.5"
            />
          </Preview>
        </div>
        <div className="col-start-4">
          <Preview onClick={() => setPreviewImgIndex(2)}>
            <Image
              src="/properties/property_details_image_3.png"
              alt="property_image_3"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-60.5 rounded-tr-xl"
            />
          </Preview>
        </div>
        <div className="col-start-3 row-start-2">
          <Preview onClick={() => setPreviewImgIndex(3)}>
            <Image
              src="/properties/property_details_image_4.png"
              alt="property_image_4"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-60.5"
            />
          </Preview>
        </div>
        <div className="col-start-4 row-start-2 relative">
          <Preview onClick={() => setPreviewImgIndex(4)}>
            <Image
              src="/properties/property_details_image_5.png"
              alt="property_image_5"
              width={1200}
              height={1200}
              className="w-full h-full object-cover max-h-60.5 rounded-br-xl"
            />
          </Preview>
          <div
            onClick={() => setPreviewImgIndex(5)}
            className="bg-white/90 flex items-center gap-1 absolute bottom-4 right-4 px-2 py-1.5 text-sm font-medium rounded-md z-999 cursor-pointer"
          >
            <LayoutGrid size={16} /> Show all photos
          </div>
        </div>
      </div>

      <div>
        {/* <button
          onClick={() => setPreviewImgIndex(1)}
          className="px-4 py-2 bg-primary-color text-white rounded"
        >
          Open Gallery
        </button> */}

        <ImagePreviewer
          imageUrls={images}
          previewImgIndex={previewImgIndex}
          setPreviewImgIndex={setPreviewImgIndex}
        />
      </div>
    </>
  );
}
