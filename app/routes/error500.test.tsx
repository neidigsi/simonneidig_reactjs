import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import Error500 from "@/routes/error500";

jest.mock("react-i18next", () => {
  const actual = jest.requireActual("react-i18next");
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: "en", changeLanguage: jest.fn() },
    }),
  };
});

jest.mock("@/components/general/icon", () => ({
  __esModule: true,
  default: () => <span data-testid="mock-icon" />,
}));

jest.mock("@/assets/css/main.css", () => ({}));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderError() {
  return render(
    <MemoryRouter initialEntries={["/error"]}>
      <Error500 />
      <LocationProbe />
    </MemoryRouter>
  );
}

describe("Error500 route", () => {
  it("sets the document title and shows the error content", () => {
    renderError();
    expect(document.title).toBe("500 | Simon Neidig");
    expect(screen.getByText("error.server-error.title")).toBeInTheDocument();
    expect(screen.getByText("error.server-error.description")).toBeInTheDocument();
    expect(screen.getByAltText("500 Server Error")).toHaveAttribute("src", "/images/500.png");
  });

  it("navigates home when the back button is clicked", () => {
    renderError();
    fireEvent.click(screen.getByRole("button", { name: "error.server-error.button" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
