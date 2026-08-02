"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FooterActionButton() {
  const router = useRouter();
  return (
    <div className="w-full flex items-center md:gap-4 gap-2">
      <Button onClick={() => router.back()} className="flex-1 bg-transparent border-primary-border-color text-primary-black hover:bg-gray-100 py-5 cursor-pointer">
        Back to Edit
      </Button>
      <Button  className="flex-1 bg-primary-color  text-white hover:bg-primary-color hover:opacity-90 py-5 cursor-pointer">
        Submit Offer
      </Button>
    </div>
  );
}
