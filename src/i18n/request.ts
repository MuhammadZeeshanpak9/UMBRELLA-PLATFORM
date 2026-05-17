import { getRequestConfig } from "next-intl/server";
import { routing, CORE_LOCALES, type CoreLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !CORE_LOCALES.includes(locale as CoreLocale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
