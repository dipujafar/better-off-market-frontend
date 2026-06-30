import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-360 px-4 md:px-8  xl:px-12 2xl:px-16",
        className
      )}
    >
      {children}
    </div>
  );
}
export default Container;