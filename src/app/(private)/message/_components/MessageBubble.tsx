import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isMe = message.sender === "me";

  return (
    <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isMe
            ? "bg-primary-color text-white rounded-br-md"
            : "bg-[#ECEEF0] text-primary-black rounded-bl-md",
        )}
      >
        {message.content}
      </div>
      <span className="text-xs text-slate-400 mt-1 px-1">{message.time}</span>
    </div>
  );
}