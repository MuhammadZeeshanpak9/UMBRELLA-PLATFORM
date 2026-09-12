import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except Next.js internals, API routes, and static assets
    "/((?!api|_next|favicon|icon|apple-icon|robots|sitemap|manifest|Assets|images|apple-touch-icon|og-image).*)",
    "/",
  ],
};
