import { mockConversations, mockThreads } from "@/data/message";
import MessagesContainer from "./_components/MessagesPage";
import Container from "@/components/shared/container/Container";
import Navbar from "@/components/shared/navbar/Navbar";

export const metadata = {
  title: "Message",
  description: "This the official website of Better Off Market",
};

export default function MessagePage() {
  return (
    <div className="space-y-8">
      <Navbar className="pt-10" />
      <Container>
        <MessagesContainer
          conversations={mockConversations}
          threads={mockThreads}
        />
      </Container>
    </div>
  );
}
