"use client";

import Lightbox from "yet-another-react-lightbox";
import {
  Fullscreen,
  Zoom,
  Slideshow,
  Thumbnails,
} from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function ImagePreviewer({
  imageUrls,
  previewImgIndex,
  setPreviewImgIndex,
}: {
  imageUrls: string[];
  previewImgIndex: number;
  setPreviewImgIndex: (index: number) => void;
}) {
  const imageSlides = imageUrls?.map((imageUrl) => {
    return { src: imageUrl };
  });

  if (!imageUrls) return null;

  return (
    <Lightbox
      index={previewImgIndex}
      slides={imageSlides || []}
      open={previewImgIndex >= 0}
      close={() => setPreviewImgIndex(-1)}
      plugins={[Fullscreen, Zoom, Slideshow, Thumbnails]}
      thumbnails={{
        position: "bottom",
        width: 80,
        height: 60,
        border: 0.5,
        borderRadius: 4,
        padding: 4,
        gap: 8,
      }}
    />
  );
}