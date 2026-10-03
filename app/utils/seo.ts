/**
 * Central SEO helpers for simon-neidig.eu.
 *
 * All search-engine relevant constants (canonical domain, default descriptions,
 * crawler directives) live here so every route exposes identical, SSR-rendered
 * meta tags via React Router `meta()` exports. Client-side `document.title`
 * updates remain for in-app navigation, but crawlers only see the SSR output.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 */

export const SITE_URL = "https://simon-neidig.eu";
export const SITE_NAME = "Simon Neidig";
export const SITE_LOCALE = "de_DE";

export const DEFAULT_DESCRIPTION =
  "Simon Neidig – Freelancer für Softwareentwicklung, Projektleitung & Business Analyse. Projekte, Lebenslauf und Kontakt auf simon-neidig.eu.";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function canonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export function pageMeta({ title, description, path, noindex }: PageSeo) {
  const canonical = canonicalUrl(path);
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
    { rel: "canonical", href: canonical },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  return meta;
}

export const PAGE_SEO: Record<string, PageSeo> = {
  about: {
    title: "Simon Neidig – Freelance Softwareentwickler, Projektleitung & Business Analyse",
    description:
      "Simon Neidig, Freelancer für Softwareentwicklung, Projektleitung & Business Analyse. Expertise, Projekte und Kontakt.",
    path: "/",
  },
  resume: {
    title: "Lebenslauf – Simon Neidig | Erfahrung & Ausbildung",
    description:
      "Lebenslauf von Simon Neidig: Berufserfahrung, Ausbildung und Skills als Freelance Softwareentwickler, Projektleitung & Business Analyse (React, TypeScript, FastAPI, Python).",
    path: "/resume",
  },
  works: {
    title: "Projekte – Simon Neidig | Referenzen & Arbeiten",
    description:
      "Ausgewählte Projekte von Simon Neidig: Web-Apps, Portfolios und Kundenarbeiten mit React, TypeScript & FastAPI.",
    path: "/works",
  },
  contact: {
    title: "Kontakt – Simon Neidig | Anfrage für Ihr Webprojekt",
    description:
      "Kontakt zu Simon Neidig, Freelancer für Softwareentwicklung, Projektleitung & Business Analyse: Projekt anfragen, Nachricht senden, schnelle Rückmeldung.",
    path: "/contact",
  },
  imprint: {
    title: "Impressum – Simon Neidig",
    description: "Impressum von Simon Neidig, Freelancer für Softwareentwicklung, Projektleitung & Business Analyse.",
    path: "/page/imprint",
  },
  privacy: {
    title: "Datenschutz – Simon Neidig",
    description:
      "Datenschutzerklärung von simon-neidig.eu: welche Daten verarbeitet werden und Ihre Rechte.",
    path: "/page/privacy",
  },
};

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Simon Neidig",
    url: `${SITE_URL}/`,
    jobTitle: "Freelance Softwareentwickler, Projektleitung & Business Analyse",
    description: DEFAULT_DESCRIPTION,
    email: "mailto:mail@simon-neidig.eu",
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "Python",
      "FastAPI",
      "Softwareentwicklung",
      "Projektleitung",
      "Business Analyse",
    ],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: ["de", "en", "fr"],
  };
}
