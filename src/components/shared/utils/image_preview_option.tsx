import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import React from "react";

export default function Preview({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className={cn("group relative text-lg font-medium", className)}>
      {/* Preview overlay */}
      <div
        className="flex-center invisible absolute inset-0 z-99 h-full cursor-pointer gap-x-1 rounded-md bg-black/25 bg-opacity-50 font-dm-sans  text-white opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100"
        onClick={onClick}
      >
        <Eye size={20} />
        <p>Preview</p>
      </div>

      {children}
    </div>
  );
}
