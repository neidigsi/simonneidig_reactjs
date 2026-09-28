import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LanguageSwitcher from "@/components/actionBar/languageSwitcher";
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

function makeStore(language: string) {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language, isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

function renderSwitcher(language = "en") {
  const store = makeStore(language);
  const ui = render(
    <Provider store={store}>
      <LanguageSwitcher />
    </Provider>
  );
  return { store, ...ui };
}

describe("LanguageSwitcher", () => {
  it("renders the switcher button and hides language options initially", () => {
    renderSwitcher("en");
    expect(
      screen.getByRole("button", { name: "header.actionbar.language.title" })
    ).toBeInTheDocument();
    expect(screen.queryByTitle("header.actionbar.language.de")).not.toBeInTheDocument();
    expect(screen.queryByTitle("header.actionbar.language.fr")).not.toBeInTheDocument();
  });

  it("opens the menu on click and shows other languages excluding current", () => {
    renderSwitcher("en");
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.language.title" }));
    // de and fr visible, en hidden
    expect(screen.getByTitle("header.actionbar.language.de")).toBeInTheDocument();
    expect(screen.getByTitle("header.actionbar.language.fr")).toBeInTheDocument();
    expect(screen.queryByTitle("header.actionbar.language.en")).not.toBeInTheDocument();
  });

  it("toggles closed when clicking the switcher twice", () => {
    renderSwitcher("en");
    const toggle = screen.getByRole("button", { name: "header.actionbar.language.title" });
    fireEvent.click(toggle);
    expect(screen.getByTitle("header.actionbar.language.de")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByTitle("header.actionbar.language.de")).not.toBeInTheDocument();
  });

  it("dispatches changeLanguage and closes menu on language select", () => {
    const { store } = renderSwitcher("en");
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.language.title" }));
    fireEvent.click(screen.getByTitle("header.actionbar.language.de"));
    expect(store.getState().settings.language).toBe("de");
    // menu closed again
    expect(screen.queryByTitle("header.actionbar.language.fr")).not.toBeInTheDocument();
  });

  it("excludes the currently active language (de)", () => {
    renderSwitcher("de");
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.language.title" }));
    expect(screen.getByTitle("header.actionbar.language.en")).toBeInTheDocument();
    expect(screen.getByTitle("header.actionbar.language.fr")).toBeInTheDocument();
    expect(screen.queryByTitle("header.actionbar.language.de")).not.toBeInTheDocument();
  });
});
