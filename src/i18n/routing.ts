import { defineRouting } from "next-intl/routing";

export const CORE_LOCALES = ["en", "es", "fr", "ar", "zh", "pt", "de", "ja", "hi", "sw"] as const;
export type CoreLocale = typeof CORE_LOCALES[number];

export const routing = defineRouting({
  locales: CORE_LOCALES,
  defaultLocale: "en",
  localePrefix: "always",
});
