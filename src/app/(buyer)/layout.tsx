import Footer from "@/components/shared/footer/Footer";
import React from "react";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="min-h-[calc(100vh-150px)]">{children}</main>
      <Footer />
    </div>
  );
}
