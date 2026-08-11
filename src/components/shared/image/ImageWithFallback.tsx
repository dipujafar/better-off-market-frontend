// components/shared/PropertyImage.tsx
"use client";

import { skeletonDataURL } from "@/components/skeleton/image-loading";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface PropertyImageProps extends Omit<ImageProps, "src" | "onError" | "placeholder" | "blurDataURL"> {
  src: string | undefined | null;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = "/placeholder_image.jpg",
  alt,
  width,
  height,
  className,
  ...rest
}: PropertyImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasErrored, setHasErrored] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={skeletonDataURL(
        typeof width === "number" ? width : 1200,
        typeof height === "number" ? height : 1200,
      )}
      className={className}
      onError={() => {
        if (!hasErrored) {
          setHasErrored(true);
          setImgSrc(fallbackSrc);
        }
      }}
      {...rest}
    />
  );
}