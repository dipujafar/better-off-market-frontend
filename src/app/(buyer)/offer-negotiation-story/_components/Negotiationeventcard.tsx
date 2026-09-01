import Image from "next/image";
import {
  STATUS_CONFIG,
  avatarColorForName,
  formatCurrency,
  type NegotiationEvent,
} from "./utils.data";
import { cn } from "@/lib/utils";

export function NegotiationEventCard({ event }: { event: NegotiationEvent }) {
  const config = STATUS_CONFIG[event.status];
  const avatarClassName =
    event.avatarClassName ?? avatarColorForName(event.actorName);

  return (
    <div
      className={cn(
        "flex-1 rounded-xl  bg-card p-4 shadow-[0_10px_30px_0_rgba(15,23,42,0.05)] sm:p-5",
        config.borderClassName,
      )}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span
            className={cn(
              "inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
              config.badgeClassName,
            )}
          >
            {config.label}
          </span>
          <p

            className={cn(
              "mt-1.5 text-2xl font-semibold sm:text-[28px]",
              config.amountClassName,
            )}
          >
            {formatCurrency(event.amount)}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm font-semibold text-foreground">{event.date}</p>
          <p className="text-xs text-muted-foreground">{event.time}</p>
        </div>
      </div>

      <div className={cn("my-3 border-t", config.dividerClassName)} />

      <div className="flex items-center gap-2.5">
        {event.actorProfile ? (
          <Image
            src={event.actorProfile}
            alt={event.actorName}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              avatarClassName,
            )}

          >
            {event.actorInitials}
          </span>
        )}
        <div>
          <p className="text-sm font-medium text-foreground">
            {event.actionLabel}
          </p>
          <p className="text-xs text-muted-foreground">{event.actorRole}</p>
        </div>
      </div>
    </div>
  );
}