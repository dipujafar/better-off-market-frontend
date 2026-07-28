import Navbar from "@/components/shared/navbar/Navbar";
import NotificationsPanel from "./_components/NotificationsPanel";
import Container from "@/components/shared/container/Container";

export const metadata = {
  title: "Notifications",
  description: "This the official website of Better Off Market",
};

export default function NotificationPage() {
  return (
    <div>
      <Navbar className="pt-10" />
      <Container className="mt-6">
        <h3 className="text-primary-black text-3xl font-semibold mb-1">
          Notifications
        </h3>
        <p className="text-[#5D5F5F] mb-4">All notifications</p>
        <NotificationsPanel />
      </Container>
    </div>
  );
}
