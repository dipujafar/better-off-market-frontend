import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

interface NotificationsPanelProps {
  title?: string;
  notifications?: Notification[];
  className?: string;
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    message: "Your offer on Condo — Phoenix, AZ was accepted!",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    message: "Counter offer on Duplex — Nashville, TN — seller countered at $305,000",
    timestamp: "1 year ago",
  },
  {
    id: "3",
    message: "Congratulations! Your listing has been approved. It is now live.",
    timestamp: "1 year ago",
  },
  {
    id: "4",
    message: "New message from James R. about the Memphis property",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    message: "Your offer on Condo — Phoenix, AZ was accepted!",
    timestamp: "2 hours ago",
  },
];

export default function NotificationsPanel({
  title = "Today",
  notifications = DEFAULT_NOTIFICATIONS,
  className,
}: NotificationsPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[#C4C7C780] bg-white p-6",
        className,
      )}
    >
      <p className="mb-4  text-primary-black">{title}</p>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-2xl border border-[#C4C7C780] px-5 py-4"
          >
            <p className="text-sm font-semibold text-gray-scale-900">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-primary-gray">
              {notification.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}