import Container from "@/components/shared/container/Container";
import about_image from "@/assets/images/about_image_1.png";
import Image from "next/image";

export default function Header() {
  return (
    <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* content */}
      <div className="flex-1 md:space-y-4 space-y-3">
        <h6 className="text-sm text-primary-color font-semibold bg-[#D1E5FF] max-w-max px-4 py-1.5 rounded-full">
          DIRECT REAL ESTATE
        </h6>
        <h3 className="lg:text-[64px] md:text-4xl text-3xl font-bold">
          About <span className="text-[#1F4E8B]"> PropMarket </span>
        </h3>
        <p className="text-lg text-primary-gray max-w-lg leading-relaxed">
          We connect real estate sellers and investors directly — no agents, no
          commissions on our platform. Experience the future of transparent
          property trading.
        </p>
      </div>
      {/* image */}
      <div className="flex-1">
        <div className="relative">
          <div className="rounded-xl overflow-hidden">
            <Image
              src={about_image.src}
              alt="about image"
              width={1024}
              height={1024}
              className="w-full  object-cover rounded-xl"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 lg:-left-12 bg-white rounded-lg shadow-xl p-4 max-w-65 -rotate-6">
            <div className="flex text-primary-color text-xl mb-1">★★★★★</div>
            <p className="text-xs font-semibold text-[#594139]  leading-relaxed">
             "PropMarket completely changed how I look for off-market opportunities. The transparency is unmatched."
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
