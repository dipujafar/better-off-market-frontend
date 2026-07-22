"use client";

import { Search } from "lucide-react";
import ConversationListItem from "./ConversationListItem";
import type { Conversation } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  className?: string;
};

export default function ConversationSidebar({
  conversations,
  activeId,
  onSelect,
  className,
}: Props) {
  return (
    <aside className={cn("flex flex-col h-full bg-[#F2F4F6]", className)}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
        <h1 className="text-xl font-semibold text-primary-black">Messages</h1>
        <button
          aria-label="Search conversations"
          className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
        >
          <Search className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {conversations.map((c) => (
          <ConversationListItem
            key={c.id}
            conversation={c}
            active={c.id === activeId}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>
    </aside>
  );
}