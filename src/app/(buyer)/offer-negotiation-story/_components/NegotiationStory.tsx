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
  messageLabel,
  hasMore,
  onLoadMore,
  isLoadingMore,
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

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-60"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}