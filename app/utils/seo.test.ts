import {
  SITE_URL,
  canonicalUrl,
  personJsonLd,
  websiteJsonLd,
  pageMeta,
} from "@/utils/seo";

describe("seo utils", () => {
  it("builds canonical URLs with leading slash handling", () => {
    expect(canonicalUrl("/resume")).toBe(`${SITE_URL}/resume`);
    expect(canonicalUrl("works")).toBe(`${SITE_URL}/works`);
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("builds page meta with title, description, canonical and social tags", () => {
    const meta = pageMeta({
      title: "Resume – Simon Neidig",
      description: "CV description",
      path: "/resume",
    });
    const byKey = (key: string, value: string) =>
      meta.find((entry) => entry[key] === value);
    expect(byKey("title", "Resume – Simon Neidig")).toBeDefined();
    expect(byKey("name", "description")).toEqual({
      name: "description",
      content: "CV description",
    });
    expect(byKey("rel", "canonical")).toEqual({
      rel: "canonical",
      href: `${SITE_URL}/resume`,
    });
    expect(byKey("property", "og:url")).toEqual({
      property: "og:url",
      content: `${SITE_URL}/resume`,
    });
    expect(byKey("name", "robots")).toEqual({
      name: "robots",
      content: expect.stringContaining("index"),
    });
  });

  it("marks private pages as noindex", () => {
    const meta = pageMeta({
      title: "Login",
      description: "Sign in",
      path: "/login",
      noindex: true,
    });
    expect(
      meta.find((entry) => entry.name === "robots")
    ).toEqual({ name: "robots", content: "noindex, nofollow" });
  });

  it("exposes Person and WebSite JSON-LD for name search", () => {
    expect(personJsonLd()).toMatchObject({
      "@type": "Person",
      name: "Simon Neidig",
      url: `${SITE_URL}/`,
    });
    expect(websiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      name: "Simon Neidig",
    });
  });
});
