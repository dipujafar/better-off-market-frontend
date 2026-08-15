"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { PropertyCard } from "../card/property-card";
import { IPropertyResponse } from "@/types";

const PreviewPropertyCarousel = ({
  propertiesData,
}: {
  propertiesData: IPropertyResponse[];
}) => {
  return (
    <Carousel
      opts={{
        loop: false,
        duration: 60,
        align: "start",
      }}
      className="relative "
    >
      <CarouselContent key={Math.random()}>
        {propertiesData?.slice(0, 8)?.map((data) => (
          <CarouselItem key={data?._id} className=" md:basis-1/2 xl:basis-1/3">
            <PropertyCard {...data} propertiesSpecificationsClassName="text-base" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="md:-left-5 -left-3  size-11 -top-1/3  border-none bg-black/40 backdrop-blur-[3px]   hover:bg-primary-color/80 text-white shadow-md  hover:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer" />
      <CarouselNext className="md:-right-5 -right-3  size-11 -top-1/3 border-none bg-black/40 backdrop-blur-[3px] hover:bg-primary-color/80 text-white shadow-md  hover:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer" />
    </Carousel>
  );
};

export default PreviewPropertyCarousel;
