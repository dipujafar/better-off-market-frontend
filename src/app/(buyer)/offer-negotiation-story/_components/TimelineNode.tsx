import { cn } from "@/lib/utils";
import { STATUS_CONFIG, type NegotiationStatus } from "./utils.data";

export function TimelineNode({ status }: { status: NegotiationStatus }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm",
        config.nodeClassName,
      )}
    >
      <Icon size={16} />
    </span>
  );
}
