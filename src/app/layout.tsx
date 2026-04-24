import type { Metadata, Viewport } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import GalaxyBackground from "@/components/layout/GalaxyBackground";
import { BRANDS } from "@/config/brands";

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

const SITE_URL = "https://www.elev8incorporation.org";
const SITE_NAME = "ELEV8 Corporation";
const SITE_TITLE = "ELEV8 Corporation | Youniverse Hub — Mind, Body & Soul Elevation";
const SITE_DESCRIPTION =
  "ELEV8 Corporation — #1 mental wellness & spiritual elevation hub. 21 Mind, Body & Soul brands covering therapy, consciousness, godly living, crypto, fashion & music. Elevate Y.O.U.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ELEV8 Corporation",
    "ELEV8 Youniverse",
    "Mind Body Soul",
    "spiritual wellness",
    "self development",
    "consciousness elevation",
    "elev8incorporation",
    "elev8all",
    "premium lifestyle",
    "godly living",
    "The Grand Designer",
    "The World's Greatest Water",
    "ELEV8 Mentalversity",
    "ELEV8 Venture Capital",
    "ELEV8 Media",
    "ELEV8 Renewables",
    "Mental wellness",
    "Mental health",
    "Who am I",
    "How to",
    "Best Wellness therapy",
    "I only drink the greatest",
    "Love myself",
    "Who is the",
    "Mental therapy",
    "Who is God",
    "The most expensive mental wellness session in the world",
    "The most expensive mental health therapy in the world",
    "The most successful wellness program in the world",
    "The most successful mental health program in the world",
    "The best mental health wellness program in the world",
  ],
  authors: [{ name: "ELEV8 Corporation", url: SITE_URL }],
  creator: "ELEV8 Corporation",
  publisher: "ELEV8 Corporation",
  alternates: {
    canonical: SITE_URL,
  },
  category: "Health & Wellness",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ELEV8 Corporation — Youniverse Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    site: "@elev8corporation",
    creator: "@elev8corporation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#9f81b9",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ELEV8 Corporation",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.elev8corporation.com",
        "https://www.elev8corporation.org",
        "https://www.elev8enterprises.com",
        "https://www.elev8enterprises.org",
        "https://www.elev8incorporation.com",
        "https://www.elev8all.org",
        "https://www.elev8inc.org",
        "https://www.elev8inc.com",
        "https://youtube.com/@theworldsgreatestwater111",
        "https://www.tiktok.com/@theworldsgreatestwater",
        "https://www.instagram.com/theworldsgreatestwater",
      ],
      description:
        "ELEV8 Corporation is the #1 mental wellness & spiritual elevation hub — 21 Mind, Body & Soul brands designed to elevate every dimension of life.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "general enquiries",
        url: `${SITE_URL}/#contact`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ELEV8 Corporation Youniverse Hub",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?filter={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ],
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#brand-ecosystem`,
      name: "ELEV8 Youniverse — Brand Ecosystem",
      description:
        "21 world-class brands across Mind, Body & Soul — mental wellness, spirituality, godly living, crypto, fashion, music & more.",
      numberOfItems: BRANDS.length,
      itemListElement: BRANDS.map((brand, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Organization",
          name: brand.name,
          url: brand.url,
          description: brand.description,
        },
      })),
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
