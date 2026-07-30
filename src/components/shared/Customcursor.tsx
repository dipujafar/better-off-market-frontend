"use client";
import { useEffect, useRef } from "react";

/**
 * Renders a fixed 30px dot cursor plus a horizontal + vertical line
 * that always cross through the dot's exact center, following the
 * mouse. Uses refs + direct style writes (not React state) so it's
 * smooth at 60fps with zero re-renders.
 *
 * Usage: render <CustomCursor /> once, near the root of your app
 * (e.g. in app/layout.tsx), and hide the native cursor globally
 * via CSS (see globals.css snippet below).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices — there's no real cursor to replace there
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let frame: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 15}px, ${
          mouseY - 15
        }px, 0)`;
      }
      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${mouseY}px, 0)`;
      }
      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${mouseX}px, 0, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Horizontal line — full width, 1px tall, moves on the Y axis */}
      <div
        ref={hLineRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-px w-screen bg-black/40 will-change-transform"
      />
      {/* Vertical line — full height, 1px wide, moves on the X axis */}
      <div
        ref={vLineRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-screen w-px bg-black/40 will-change-transform"
      />
      {/* The 30px dot itself, centered on the crosshair intersection */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[30px] w-[30px] rounded-full border-2 border-black bg-black/10 will-change-transform"
      />
    </>
  );
}