import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "@/types";

type Props = {
  dateLabel: string;
  messages: ChatMessage[];
};

export default function ChatMessages({ dateLabel, messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
      <div className="flex justify-center mb-6">
        <span className="text-xs font-medium text-[#594139] bg-[#ECEEF0] rounded-full px-3 py-1">
          {dateLabel}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
}