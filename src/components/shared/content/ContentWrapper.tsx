"use client";

import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export default function ContentWrapper({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (content) {
      setSanitizedContent(DOMPurify.sanitize(content));
    }
  }, [content]);

  return (
    <>
      {sanitizedContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className={cn(className)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
