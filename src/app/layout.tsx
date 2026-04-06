import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import GalaxyBackground from "@/components/layout/GalaxyBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELEV8 Corporation | Universe Hub",
  description: "A Universe of Creations Designed to Elevate Life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
        <GalaxyBackground />
        <div className="relative z-10 flex flex-col min-h-full">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
