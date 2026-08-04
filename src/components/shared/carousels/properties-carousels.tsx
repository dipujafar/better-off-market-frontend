"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PropertyCard } from "../card/property-card";
import { IProperty } from "@/types";

const PreviewPropertyCarousel = ({
  propertiesData,
}: {
  propertiesData: IProperty[];
}) => {
  return (
    <Carousel
      opts={{
        loop: false,
        duration: 60,
        align: "start",
      }}
      plugins={[
        // Autoplay({
        //   delay: 4000,
        //   stopOnInteraction: false,
        //   stopOnMouseEnter: true,
        // }),
      ]}
      className="relative "
    >
      <CarouselContent>
        {propertiesData?.slice(0, 8)?.map((data) => (
          <CarouselItem
            key={data?.id}
            className=" md:basis-1/2 xl:basis-1/3"
          >
            <PropertyCard {...data} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="md:-left-5 -left-3  size-11 -top-1/3  border-none bg-black/40 backdrop-blur-[3px]   hover:bg-primary-color/80 text-white shadow-md  hover:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer" />
      <CarouselNext className="md:-right-5 -right-3  size-11 -top-1/3 border-none bg-black/40 backdrop-blur-[3px] hover:bg-primary-color/80 text-white shadow-md  hover:text-white disabled:opacity-0 disabled:pointer-events-none cursor-pointer" />
    </Carousel>
  );
};

export default PreviewPropertyCarousel;