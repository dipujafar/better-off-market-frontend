import { NegotiationStoryHeader } from "./NegotiationStoryHeader";
import { NegotiationTimeline } from "./NegotiationTimeline";
import { NegotiationEvent } from "./utils.data";

interface NegotiationStoryProps {
  title?: string;
  events: NegotiationEvent[];
  onBack?: () => void;
  onMessage?: () => void;
  messageLabel?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function NegotiationStory({
  title,
  events,
  onBack,
  onMessage,
  messageLabel
}: NegotiationStoryProps) {
  return (
    <div className=" px-4 py-6 sm:px-6 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] border border-[#E0E3E580] rounded-lg">
      <NegotiationStoryHeader
        title={title}
        onBack={onBack}
        onMessage={onMessage}
        messageLabel={messageLabel}
      />

      <NegotiationTimeline events={events} />
    </div>
  );
}