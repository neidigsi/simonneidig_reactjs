// Import external dependencies
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

// Import internal dependencies
import type { Route } from "./+types/root";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
} from "@/utils/seo";

export const meta: Route.MetaFunction = () => [
  { name: "description", content: DEFAULT_DESCRIPTION },
  {
    name: "robots",
    content: "index, follow, max-image-preview:large",
  },
  { name: "author", content: SITE_NAME },
  { name: "theme-color", content: "#0f172a" },
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "de_DE" },
  { property: "og:url", content: `${SITE_URL}/` },
  { name: "twitter:card", content: "summary" },
];

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/favicon.ico",
  },
  {
    rel: "manifest",
    href: "/manifest.webmanifest",
  },
  {
    rel: "apple-touch-icon",
    href: "/favicon.ico",
  },
];

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Search Console verification: replace content with the token from
            https://search.google.com/search-console after adding the property. */}
        {/* <meta name="google-site-verification" content="PASTE_TOKEN_HERE" /> */}
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
