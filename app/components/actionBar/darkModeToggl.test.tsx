import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";
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

function setupMatchMedia(prefersDark = false) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

function makeStore(isDarkModeEnabled: boolean) {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled, backButtonEnabled: false },
    },
  });
}

describe("DarkModeToggl", () => {
  beforeEach(() => {
    setupMatchMedia(false);
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("initializes dark mode on mount", () => {
    const store = makeStore(false);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <DarkModeToggl />
      </Provider>
    );
    expect(dispatchSpy).toHaveBeenCalled();
    const firstAction: any = dispatchSpy.mock.calls[0][0];
    // initializeDarkMode is dispatched on mount (thunk-less action creator -> function or object)
    expect(firstAction).toBeDefined();
  });

  it("shows moon title when light mode is active", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <DarkModeToggl />
      </Provider>
    );
    expect(screen.getByRole("button", { name: "header.actionbar.dark-mode.dark" })).toBeInTheDocument();
  });

  it("shows sun title when dark mode is active", () => {
    localStorage.setItem("theme", "dark");
    const store = makeStore(true);
    render(
      <Provider store={store}>
        <DarkModeToggl />
      </Provider>
    );
    expect(
      screen.getByRole("button", { name: "header.actionbar.dark-mode.light" })
    ).toBeInTheDocument();
  });

  it("dispatches toggleDarkMode on click and flips state", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <DarkModeToggl />
      </Provider>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(store.getState().settings.isDarkModeEnabled).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggles back to light mode", () => {
    localStorage.setItem("theme", "dark");
    const store = makeStore(true);
    render(
      <Provider store={store}>
        <DarkModeToggl />
      </Provider>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(store.getState().settings.isDarkModeEnabled).toBe(false);
  });
});
