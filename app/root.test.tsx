import { render, screen } from "@testing-library/react";
import App, { links, Layout } from "@/root";

jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    Links: () => <link data-testid="mock-links" />,
    Meta: () => <meta data-testid="mock-meta" />,
    Scripts: () => <template data-testid="mock-scripts" />,
    ScrollRestoration: () => <noscript data-testid="mock-scroll-restoration" />,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

describe("root links", () => {
  it("registers the favicon, manifest and apple touch icon", () => {
    expect(links()).toEqual([
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ]);
  });
});

describe("root Layout", () => {
  it("renders an english html shell with meta, links and children", () => {
    // React mounts html/head/body as document singletons, so assert on document.
    const previousLang = document.documentElement.getAttribute("lang");
    render(<Layout>hello-world</Layout>);
    expect(document.documentElement.getAttribute("lang")).toBe("en");
    if (previousLang === null) {
      document.documentElement.removeAttribute("lang");
    } else {
      document.documentElement.setAttribute("lang", previousLang);
    }
    expect(document.head.querySelector('[data-testid="mock-meta"]')).not.toBeNull();
    expect(document.head.querySelector('[data-testid="mock-links"]')).not.toBeNull();
    expect(screen.getByText("hello-world")).toBeInTheDocument();
    expect(screen.getByTestId("mock-scroll-restoration")).toBeInTheDocument();
    expect(screen.getByTestId("mock-scripts")).toBeInTheDocument();
  });
});

describe("root App", () => {
  it("renders the current route outlet", () => {
    render(<App />);
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
