// components/shared/ReadMoreText.tsx
"use client";

import { useMemo, useState } from "react";

interface ReadMoreTextProps {
  text: string;
  wordLimit?: number;
  className?: string;
}

export default function ReadMoreText({
  text,
  wordLimit = 100,
  className,
}: ReadMoreTextProps) {
  const [expanded, setExpanded] = useState(false);

  const words = useMemo(() => text?.trim().split(/\s+/) ?? [], [text]);
  const isLong = words.length > wordLimit;

  const displayText =
    expanded || !isLong ? text : words.slice(0, wordLimit).join(" ") + "...";

  return (
    <>
      <p className={className}>{displayText}</p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-[#1F4E8B] font-semibold text-sm hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </>
  );
}
