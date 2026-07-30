import { NegotiationEventCard } from "./Negotiationeventcard";
import { TimelineNode } from "./TimelineNode";
import { NegotiationEvent } from "./utils.data";

export function NegotiationTimeline({ events }: { events: NegotiationEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-6">
      {/* Connecting rail, centered under the 40px nodes */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-border"
      />

      {events.map((event) => (
        <li key={event.id} className="flex items-start gap-3 sm:gap-4">
          <TimelineNode status={event.status} />
          <NegotiationEventCard event={event} />
        </li>
      ))}
    </ol>
  );
}