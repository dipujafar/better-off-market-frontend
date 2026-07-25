"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type TProps = {
  link: { label: string; path: string };
};

export default function NavLinks({ link }: TProps) {
  const pathName = usePathname();
  const isActive = pathName === link.path || pathName.includes(link.path);

  return (
    <Link
      href={link.path}
      className={cn(
        "relative py-1.5 px-4 rounded-full transition-colors duration-300 text-center",
        isActive
          ? " text-white lg:text-black/80"
          : "text-black lg:text-white/80",
      )}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav-pill"
          className={"absolute inset-0  rounded-full lg:bg-white bg-black/80"}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10 ">{link.label}</span>
    </Link>
  );
}
