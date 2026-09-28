import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import { useRef } from "react";
import Navigation from "@/components/navigation/navigation";
import settingsReducer from "@/store/slices/settingsSlice";

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

function makeStore(backButtonEnabled: boolean) {
  const store = configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled },
    },
  });
  return store;
}

function renderNav(route = "/", backButtonEnabled = false) {
  const store = makeStore(backButtonEnabled);
  (store as any).dispatch = jest.fn((a: any) => a);
  function Wrapper() {
    const navRef = useRef<HTMLDivElement | null>(null);
    return <Navigation navRef={navRef} />;
  }
  const ui = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Wrapper />
      </MemoryRouter>
    </Provider>
  );
  return { store, ...ui };
}

function renderNavWithLocation(route = "/", backButtonEnabled = false) {
  const store = makeStore(backButtonEnabled);
  const dispatchSpy = jest.spyOn(store, "dispatch");
  function Wrapper() {
    const navRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    return (
      <>
        <Navigation navRef={navRef} />
        <div data-testid="location">{location.pathname}</div>
      </>
    );
  }
  const ui = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Wrapper />
      </MemoryRouter>
    </Provider>
  );
  return { store, dispatchSpy, ...ui };
}

describe("Navigation", () => {
  it("renders all four navigation items", () => {
    renderNav("/");
    expect(screen.getByRole("button", { name: "navigation.headlines.home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "navigation.headlines.resume" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "navigation.headlines.works" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "navigation.headlines.contact" })).toBeInTheDocument();
  });

  it("does not show back button when disabled", () => {
    renderNav("/", false);
    expect(screen.queryByLabelText("navigation.backButton")).not.toBeInTheDocument();
  });

  it("shows back button when enabled", () => {
    renderNav("/", true);
    expect(screen.getByLabelText("navigation.backButton")).toBeInTheDocument();
  });

  it("highlights the active item based on route", () => {
    renderNav("/resume", false);
    expect(screen.getByRole("button", { name: "navigation.headlines.resume" })).toHaveClass(
      "nav-item-active"
    );
    expect(screen.getByRole("button", { name: "navigation.headlines.home" })).not.toHaveClass(
      "nav-item-active"
    );
  });

  it("back button dispatches setBackButtonEnabled(false) and navigates back", () => {
    const { dispatchSpy } = renderNavWithLocation("/", true);
    fireEvent.click(screen.getByLabelText("navigation.backButton"));
    expect(dispatchSpy).toHaveBeenCalled();
    const action = (dispatchSpy.mock.calls[0] as any[])[0];
    expect(action.type).toBe("settings/setBackButtonEnabled");
    expect(action.payload).toBe(false);
  });

  it("clicking a navigation item navigates to its path", () => {
    renderNavWithLocation("/", false);
    fireEvent.click(screen.getByRole("button", { name: "navigation.headlines.works" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/works");
  });
});
