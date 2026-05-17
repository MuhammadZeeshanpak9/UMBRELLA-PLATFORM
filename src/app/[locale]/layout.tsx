import type { Metadata, Viewport } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import GalaxyBackground from "@/components/layout/GalaxyBackground";
import DynamicTranslationProvider from "@/components/providers/DynamicTranslationProvider";
import { BRANDS } from "@/config/brands";
import { routing, CORE_LOCALES, type CoreLocale } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "ELEV8 Corporation", "ELEV8 Youniverse", "Mind Body Soul", "spiritual wellness",
      "self development", "consciousness elevation", "elev8incorporation", "elev8all",
      "premium lifestyle", "godly living",
    ],
    authors: [{ name: "ELEV8 Corporation", url: SITE_URL }],
    creator: "ELEV8 Corporation",
    publisher: "ELEV8 Corporation",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
    category: "Health & Wellness",
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      locale: locale.replace("-", "_"),
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ELEV8 Corporation — Youniverse Hub" }],
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
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    manifest: "/manifest.json",
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#9f81b9",
};

const RTL_LOCALES: CoreLocale[] = ["ar"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ELEV8 Corporation",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 },
      description: "ELEV8 Corporation is the #1 mental wellness & spiritual elevation hub — 21 Mind, Body & Soul brands designed to elevate every dimension of life.",
      contactPoint: { "@type": "ContactPoint", contactType: "general enquiries", url: `${SITE_URL}/#contact` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ELEV8 Corporation Youniverse Hub",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#brand-ecosystem`,
      name: "ELEV8 Youniverse — Brand Ecosystem",
      numberOfItems: BRANDS.length,
      itemListElement: BRANDS.map((brand, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Organization", name: brand.name, url: brand.url, description: brand.description },
      })),
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!CORE_LOCALES.includes(locale as CoreLocale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = RTL_LOCALES.includes(locale as CoreLocale);

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${outfit.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <DynamicTranslationProvider>
            <GalaxyBackground />
            <div className="relative z-10 flex flex-col min-h-full">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </DynamicTranslationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
