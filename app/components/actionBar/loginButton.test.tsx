import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import LoginButton from "@/components/actionBar/loginButton";
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
      user: { ...baseUserState, loggedIn, jwt: loggedIn ? "test-jwt" : "" },
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

describe("LoginButton", () => {
  it("shows login title when logged out", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginButton />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole("button", { name: "header.actionbar.login.login" })).toBeInTheDocument();
  });

  it("shows logout title when logged in", () => {
    const store = makeStore(true);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginButton />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole("button", { name: "header.actionbar.login.logout" })).toBeInTheDocument();
  });

  it("navigates to /login when logged out and clicked", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginButton />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.login.login" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/login");
  });

  it("dispatches logout and resetContactStatus when logged in and clicked", () => {
    const store = makeStore(true);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginButton />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.login.logout" }));
    expect(dispatchSpy).toHaveBeenCalled();
    const types = dispatchSpy.mock.calls.map((c) => {
      const a: any = c[0];
      return typeof a === "function" ? "thunk" : a?.type;
    });
    // logout thunk (function) + resetContactStatus action
    expect(types).toContain("thunk");
    expect(types).toContain("contact/resetContactStatus");
  });

  it("does not dispatch logout when logged out", () => {
    const store = makeStore(false);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <LoginButton />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    dispatchSpy.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "header.actionbar.login.login" }));
    // only navigation, no logout/reset dispatches
    const types = dispatchSpy.mock.calls.map((c) => (c[0] as any)?.type).filter(Boolean);
    expect(types).not.toContain("contact/resetContactStatus");
  });
});
