import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import Error404 from "@/routes/error404";
import settingsReducer from "@/store/slices/settingsSlice";

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

function makeStore(isDarkModeEnabled: boolean) {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled, backButtonEnabled: false },
    },
  });
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderError(isDarkModeEnabled: boolean) {
  return render(
    <Provider store={makeStore(isDarkModeEnabled)}>
      <MemoryRouter initialEntries={["/missing"]}>
        <Error404 />
        <LocationProbe />
      </MemoryRouter>
    </Provider>
  );
}

describe("Error404 route", () => {
  it("sets the document title and shows the light image by default", () => {
    renderError(false);
    expect(document.title).toBe("404 | Simon Neidig");
    expect(screen.getByText("error.not-found.title")).toBeInTheDocument();
    expect(screen.getByText("error.not-found.description")).toBeInTheDocument();
    expect(screen.getByAltText("404 Not Found")).toHaveAttribute("src", "/images/light_404.png");
  });

  it("shows the dark image when dark mode is enabled", () => {
    renderError(true);
    expect(screen.getByAltText("404 Not Found")).toHaveAttribute("src", "/images/dark_404.png");
  });

  it("navigates home when the back button is clicked", () => {
    renderError(false);
    fireEvent.click(screen.getByRole("button", { name: "error.not-found.button" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
