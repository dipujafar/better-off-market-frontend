import Footer from "@/components/shared/footer/Footer";
import React from "react";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
