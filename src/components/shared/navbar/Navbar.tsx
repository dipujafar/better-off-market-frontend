"use client";

import { useState } from "react";
import blue_logo from "@/assets/images/logo_blue.png";
import white_log from "@/assets/images/Logo_white.png";
import Container from "../container/Container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CirclePlus, Menu } from "lucide-react";
import NavLinks from "./NavLinks";

const navClassVariant = {
  colored: "bg-black text-primary-foreground",
  transparent: " border border-white/20 bg-white/10 backdrop-blur-[6px]",
};

type TProps = {
  className?: string;
  variant?: "colored" | "transparent";
  authPage?: boolean;
};

const navLinks = [
  { label: "Home", path: "/home" },
  { label: "Browse List", path: "/properties-list" },
  { label: "About Us", path: "/about-us" },
  { label: "FAQ", path: "/faqs" },
  { label: "Contact Us", path: "/contact-us" },
];

export default function Navbar({
  className,
  variant = "colored",
  authPage = false,
}: TProps) {
  const [open, setOpen] = useState(false);

  return (
    <Container
      className={cn("w-full flex items-center justify-between", className)}
    >
      {/* ========================== logo + desktop nav links ============================ */}
      <div className={cn("flex items-center 2xl:gap-x-12 gap-8")}>
        <Link href="/">
          {variant === "colored" ? (
            <Image src={blue_logo} alt="logo" className="max-w-20 sm:max-w-25" />
          ) : (
            <Image src={white_log} alt="logo" className="max-w-20 sm:max-w-none" />
          )}
        </Link>
        <div
          className={cn(
            "hidden lg:flex py-2 px-4 text-white/80 rounded-full text-sm",
            authPage && "hidden",
            variant === "colored"
              ? navClassVariant.colored
              : navClassVariant.transparent,
          )}
        >
          {navLinks.map((link) => (
            <NavLinks key={link.label} link={link} />
          ))}
        </div>
      </div>

      {/* ========================== desktop buttons ============================ */}
      <div className="hidden lg:flex gap-x-3">
        <Button
          size={"lg"}
          className={cn(
            "bg-[#CEE3FF] hover:bg-[#CEE3FF]/85 text-[#1F4E8B] cursor-pointer px-4 rounded-full",
            authPage && "hidden",
          )}
        >
          Post a Deal{" "}
          <CirclePlus className="bg-primary-color rounded-full text-white" />{" "}
        </Button>
        <Link href="/login">
          <Button
            size={"lg"}
            className="bg-[#FFF] hover:bg-[#FFF]/70 text-black font-semibold cursor-pointer px-4 rounded-full"
          >
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            size={"lg"}
            className="bg-primary-color hover:bg-[#1F4E8B]/85 text-white font-semibold cursor-pointer px-4 rounded-full"
          >
            Sign Up
          </Button>
        </Link>
      </div>

      {/* ========================== mobile trigger ============================ */}
      <div className="flex lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "rounded-full",
                variant === "colored"
                  ? "text-white hover:bg-white/10"
                  : "text-white hover:bg-white/20",
              )}
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle>
                <Image src={blue_logo} alt="logo" className="max-w-20" />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-4 mt-6">
              {navLinks.map((link) => (
                <NavLinks key={link.label} link={link} />
              ))}
            </div>

            {!authPage && (
              <div className="flex flex-col gap-3 px-4 mt-8">
                <Button
                  size={"lg"}
                  onClick={() => setOpen(false)}
                  className="bg-[#CEE3FF] hover:bg-[#CEE3FF]/85 text-[#1F4E8B] cursor-pointer px-4 rounded-full w-full"
                >
                  Post a Deal{" "}
                  <CirclePlus className="bg-primary-color rounded-full text-white" />
                </Button>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    size={"lg"}
                    className="bg-[#F3F4F6] hover:bg-[#F3F4F6]/70 text-black font-semibold cursor-pointer px-4 rounded-full w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button
                    size={"lg"}
                    className="bg-primary-color hover:bg-[#1F4E8B]/85 text-white font-semibold cursor-pointer px-4 rounded-full w-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </Container>
  );
}