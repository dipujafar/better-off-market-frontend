"use client";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

type IProductProps = {
  title: string;
  link: string;
  className?: string;
};

export default function Share({
  className,
  title,
  link,
}: IProductProps) {
  const handleShare = () => {
    navigator.share({
      title: title,
      url: `${link}`,
    });
  };

  return (
    <button onClick={handleShare} className={cn("rounded p-2 hover:bg-gray-100", className)}>
      <Share2 className="text-primary-gray text-xl" />
    </button>
  );
}
