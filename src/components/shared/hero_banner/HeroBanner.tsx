import Navbar from "../navbar/Navbar";
import Container from "../container/Container";
import { cn } from "@/lib/utils";

type TProps = {
  data?: {
    title?: string;
    description?: string;
    className?: string;
    dataClassName?: string;
    authPage?: boolean;
    children?: React.ReactNode;
  };
};

export default function HeroBanner({ data }: TProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute top-10 w-full z-20",
          data?.authPage && "hidden",
        )}
      >
        <Navbar variant="transparent" authPage={data?.authPage || false} />
      </div>
      <div
        style={{ backgroundImage: `url('/banner_image.png')` }}
        className={cn(
          "min-h-screen w-full bg-cover bg-center flex flex-col justify-end pb-11",
          data?.className,
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.22%,rgba(0,0,0,0.7)_69.98%)]"></div>

        <Container
          className={cn(
            "relative grid md:grid-cols-3 2xl:gap-x-12 lg:gap-x-8 gap-x-4 z-20 text-white items-end",
            data?.dataClassName,
          )}
        >
          <h1 className="col-span-2 2xl:text-7xl lg:text-5xl md:text-4xl text-3xl font-semibold">
            {data?.title}
          </h1>
          <p className="font-medium mt-4 lg:mt-0">{data?.description}</p>
        </Container>
        <Container className="mt-5  w-full">{data?.children}</Container>
      </div>
    </div>
  );
}
