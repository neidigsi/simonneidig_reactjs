import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import Login from "@/routes/login";
import userReducer from "@/store/slices/userSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import { http } from "@/networking/httpRequest";

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

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("@/components/general/icon", () => ({
  __esModule: true,
  default: () => <span data-testid="mock-icon" />,
}));

jest.mock("@/assets/css/main.css", () => ({}));

const mockHttp = http as jest.Mock;

const baseUserState = {
  loaded: true,
  loggedIn: false,
  jwt: "",
  error: { active: false, code: "" },
  user: { firstName: "", lastName: "", email: "", password: "", repeatPassword: "", isSuperUser: false },
};

function makeStore(userOverrides = {}) {
  return configureStore({
    reducer: { user: userReducer, settings: settingsReducer },
    preloadedState: {
      user: { ...baseUserState, ...userOverrides },
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderLogin(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <Login />
        <LocationProbe />
      </MemoryRouter>
    </Provider>
  );
}

describe("Login route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: { access_token: "token" } });
  });

  it("renders the login form with a disabled submit button", () => {
    renderLogin(makeStore());
    expect(screen.getByText("login.title")).toBeInTheDocument();
    expect(screen.getByText("login.description")).toBeInTheDocument();
    expect(screen.getByLabelText("login.email")).toBeInTheDocument();
    expect(screen.getByLabelText("login.password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "login.submit" })).toBeDisabled();
  });

  it("enables submit after entering credentials and logs in on click", async () => {
    renderLogin(makeStore());
    fireEvent.change(screen.getByLabelText("login.email"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByLabelText("login.password"), { target: { value: "secret" } });

    const submit = screen.getByRole("button", { name: "login.submit" });
    expect(submit).not.toBeDisabled();
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "POST", path: "/auth/jwt/login" })
      );
    });
  });

  it("shows an error message for bad credentials", () => {
    renderLogin(makeStore({ error: { active: true, code: "LOGIN_BAD_CREDENTIALS" } }));
    expect(screen.getByText("login.invalid-credentials")).toBeInTheDocument();
  });

  it("navigates to the register page via the register button", () => {
    renderLogin(makeStore());
    fireEvent.click(screen.getByRole("button", { name: "login.register" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/register");
  });

  it("redirects to home when already logged in", () => {
    renderLogin(makeStore({ loggedIn: true }));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
