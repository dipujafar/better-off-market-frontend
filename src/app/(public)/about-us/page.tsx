import Navbar from "@/components/shared/navbar/Navbar";
import Header from "./_components/Header";

export const metadata = {
  title: "About us",
  description: "This the official website of Better Off Market",
}

export default function page() {
  return (
    <div className="space-y-16">
      <Navbar variant="colored" className="pt-10" />
      <Header />
    </div>
  );
}
