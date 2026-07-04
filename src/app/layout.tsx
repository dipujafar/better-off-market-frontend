import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/footer/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Better Off Market",
    template: "%s | Better Off Market",
  },
  description: "This the official website of Better Off Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <nav>
          <Navbar />
        </nav> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
