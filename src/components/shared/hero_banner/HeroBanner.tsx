import bg_image from "@/assets/images/banner_image.png";
import Navbar from "../navbar/Navbar";
import Container from "../container/Container";

export default function HeroBanner() {
  return (
    <div className="relative">
      <div className="absolute top-10 w-full z-20">
        <Navbar variant="transparent" />
      </div>
      <div
        style={{ backgroundImage: `url('/banner_image.png')` }}
        className="min-h-screen w-full bg-cover bg-center flex flex-col justify-end pb-11"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.22%,rgba(0,0,0,0.7)_69.98%)]"></div>

        <Container className="relative grid md:grid-cols-3 2xl:gap-x-12 lg:gap-x-8 gap-x-4 z-20 text-white items-end">
          <h1 className="col-span-2 2xl:text-7xl lg:text-5xl md:text-4xl text-3xl font-semibold">Find your next investment property</h1>
          <p className="font-medium">
            Browse verified listings — no agents, no middlemen. Professional
            real estate investment, simplified for the modern investor.
          </p>
        </Container>
      </div>
    </div>
  );
}