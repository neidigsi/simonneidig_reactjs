import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import Footer from "@/components/general/footer/footer";

jest.mock("react-i18next", () => {
  const actual = jest.requireActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (k: string) => k,
      i18n: { language: "en", changeLanguage: jest.fn() },
    }),
  };
});

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderFooter(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Footer />
      <LocationProbe />
    </MemoryRouter>
  );
}

describe("Footer", () => {
  it("renders copyright with current year, imprint and privacy", () => {
    renderFooter();
    const year = String(new Date().getFullYear());
    expect(screen.getByText(`footer.copyright ${year}`)).toBeInTheDocument();
    expect(screen.getByText("footer.imprint")).toBeInTheDocument();
    expect(screen.getByText("footer.privacy")).toBeInTheDocument();
  });

  it("navigates to imprint page on imprint click", () => {
    renderFooter("/");
    fireEvent.click(screen.getByText("footer.imprint"));
    expect(screen.getByTestId("location")).toHaveTextContent("/page/imprint");
  });

  it("navigates to privacy page on privacy click", () => {
    renderFooter("/");
    fireEvent.click(screen.getByText("footer.privacy"));
    expect(screen.getByTestId("location")).toHaveTextContent("/page/privacy");
  });

  it("does not navigate when clicking copyright (no path)", () => {
    renderFooter("/");
    const year = String(new Date().getFullYear());
    fireEvent.click(screen.getByText(`footer.copyright ${year}`));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
