"use client";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

type IProductProps = {
  title: string;
  link: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Share({
  className,
  title,
  link,
  children,
}: IProductProps) {
  const handleShare = () => {
    navigator.share({
      title: title,
      url: `${link}`,
    });
  };

  return (
    <div onClick={handleShare}>
      {children || (
        <button className={cn("rounded p-2 hover:bg-gray-100 text-primary-gray text-xl cursor-pointer", className)}>
          <Share2/>
        </button>
      )}
    </div>
  );
}
