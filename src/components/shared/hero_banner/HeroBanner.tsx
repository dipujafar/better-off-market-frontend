"use client";

import { useMemo } from "react";
import Navbar from "../navbar/Navbar";
import Container from "../container/Container";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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

const wordReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
};

const word = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroBanner({ data }: TProps) {
  const words = useMemo(() => (data?.title ?? "").split(" "), [data?.title]);

  return (
    <div className="relative overflow-hidden">
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "absolute top-10 w-full z-30",
          data?.authPage && "hidden",
        )}
      >
        <Navbar variant="transparent" authPage={data?.authPage || false} />
      </motion.div>

      <div
        className={cn(
          "relative min-h-screen w-full flex flex-col justify-end pb-11 overflow-hidden",
          data?.className,
        )}
      >
        {/* Ken Burns style background */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: `url('/banner_image.png')` }}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
        />

        {/* Diagonal gradient wipe overlay */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 z-10 bg-[#1F4E8B]"
        />

        {/* Base darkening gradient */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.22%,rgba(0,0,0,0.7)_69.98%)]" />

        <Container
          className={cn(
            "relative grid md:grid-cols-3 2xl:gap-x-12 lg:gap-x-8 gap-x-4 z-20 text-white items-end",
            data?.dataClassName,
          )}
        >
          <div className="col-span-2">
            {/* Word-by-word masked reveal title */}
            <motion.h1
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="col-span-2 2xl:text-7xl lg:text-5xl md:text-4xl text-3xl font-semibold flex flex-wrap gap-x-3"
            >
              {words.map((w, i) => (
                <span key={i} className="overflow-hidden inline-block pb-2">
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-medium mt-4 lg:mt-0"
          >
            {data?.description}
          </motion.p>
        </Container>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20"
        >
          <Container className="mt-5 w-full">{data?.children}</Container>
        </motion.div>

        {/* Scroll cue */}
        {/* {!data?.authPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1.5"
            >
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1.5 rounded-full bg-white/80"
              />
            </motion.div>
          </motion.div>
        )} */}
      </div>
    </div>
  );
}
