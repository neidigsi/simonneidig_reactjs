import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import ActionBar from "@/components/actionBar/actionBar";
import settingsReducer from "@/store/slices/settingsSlice";
import userReducer from "@/store/slices/userSlice";
import contactReducer from "@/store/slices/contactSlice";

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

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn().mockResolvedValue({ status: 200, data: {} }),
}));

function setupMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
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

const baseUserState = {
  loaded: true,
  loggedIn: false,
  jwt: "",
  error: { active: false, code: "" },
  user: { firstName: "", lastName: "", email: "", password: "", repeatPassword: "", isSuperUser: false },
};

function makeStore(loggedIn: boolean) {
  return configureStore({
    reducer: { settings: settingsReducer, user: userReducer, contact: contactReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
      user: { ...baseUserState, loggedIn },
      contact: {
        loaded: true,
        name: "",
        email: "",
        message: "",
        sentSuccessfully: false,
        messages: [],
        messagesLoaded: false,
        messagesLoading: false,
        error: null,
      },
    },
  });
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("ActionBar", () => {
  beforeEach(() => {
    setupMatchMedia();
    localStorage.clear();
  });

  it("renders language switcher, dark mode toggle and login button", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ActionBar />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole("button", { name: "header.actionbar.language.title" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "header.actionbar.dark-mode.dark" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "header.actionbar.login.login" })).toBeInTheDocument();
  });

  it("does not show settings button when logged out", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ActionBar />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByRole("button", { name: "header.actionbar.settings" })).not.toBeInTheDocument();
  });

  it("shows settings button when logged in and navigates to /profile on click", () => {
    const store = makeStore(true);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ActionBar />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    const settingsBtn = screen.getByRole("button", { name: "header.actionbar.settings" });
    expect(settingsBtn).toBeInTheDocument();
    fireEvent.click(settingsBtn);
    expect(screen.getByTestId("location")).toHaveTextContent("/profile");
  });

  it("toggles dark mode via the action bar", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ActionBar />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.dark-mode.dark" }));
    expect(store.getState().settings.isDarkModeEnabled).toBe(true);
  });
});
