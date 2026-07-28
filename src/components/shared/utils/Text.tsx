import { cn } from "@/lib/utils";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export default function Text({ children, className }: TextProps) {
  return (
    <p className={cn("text-lg leading-relaxed text-gray-scale-600 text-[#4A4646]", className)}>
      {children}
    </p>
  );
}