"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ConversationSidebar from "./ConversationSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import type { Conversation, ChatThread } from "@/types";
import { useSocket } from "@/context/SocketContextApi";

type Props = {
  conversations: Conversation[];
  threads: Record<string, ChatThread>; // keyed by conversation id
};

export default function MessagesContainer({ conversations, threads }: Props) {
  const [activeId, setActiveId] = useState<string | null>(
    conversations[0]?.id ?? null,
  );
  const activeThread = activeId ? threads[activeId] : null;
  const { socket } = useSocket();

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl overflow-hidden ">
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        className={cn(
          "w-full md:w-75 lg:w-85 border-r border-primary-border-color shrink-0",
          activeId && "hidden md:flex",
        )}
      />

      <div
        className={cn(
          "flex-1 min-w-0 flex-col",
          activeId ? "flex" : "hidden md:flex",
        )}
      >
        {activeThread ? (
          <>
            <ChatHeader
              contact={activeThread.contact}
              onBack={() => setActiveId(null)}
            />
            <ChatMessages
              dateLabel={activeThread.dateLabel}
              messages={activeThread.messages}
            />
            <MessageInput
              onSend={(content) => {
                // TODO: wire up to backend — e.g. sendMessage(activeId, content)
                console.log("send:", content);
              }}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
