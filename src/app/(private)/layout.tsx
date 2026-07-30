import Footer from "@/components/shared/footer/Footer";
import React from "react";

export default function SellerLayout({
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
