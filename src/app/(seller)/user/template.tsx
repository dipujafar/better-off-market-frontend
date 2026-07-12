"use client";
import Container from "@/components/shared/container/Container";
import DashboardSidebar from "./_components/DashboardSidebar";
import Navbar from "@/components/shared/navbar/Navbar";

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary-white py-10">
      <Navbar variant="colored"  />
      <Container className="items-start gap-x-8 xl:flex mt-6">
        <DashboardSidebar />
        <div className="grow">{children}</div>
      </Container>
    </div>
  );
}
