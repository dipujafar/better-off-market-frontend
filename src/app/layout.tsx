import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import Providers from "@/lib/provider/Provider";
import "react-pagination-bar/dist/index.css";
import NextTopLoader from "nextjs-toploader";
// import CustomCursor from "@/components/shared/Customcursor";

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
        <main className="min-h-[calc(100vh-150px)]">
          <Providers>
            {/* <CustomCursor /> */}
            {children}

            <NextTopLoader
              color="#00214C"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #232323,0 0 5px #EA5326"
              zIndex={1600}
              showAtBottom={false}
            />
          </Providers>
        </main>
      </body>
    </html>
  );
}
