import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import Register from "@/routes/register";
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

const filledUser = {
  user: {
    ...baseUserState.user,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "secret",
    repeatPassword: "secret",
  },
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

function renderRegister(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/register"]}>
        <Register />
        <LocationProbe />
      </MemoryRouter>
    </Provider>
  );
}

describe("Register route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 201, data: {} });
  });

  it("renders the registration form with a disabled submit button", () => {
    renderRegister(makeStore());
    expect(screen.getByText("register.title")).toBeInTheDocument();
    expect(screen.getByText("register.description")).toBeInTheDocument();
    expect(screen.getByLabelText("register.first-name")).toBeInTheDocument();
    expect(screen.getByLabelText("register.email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "register.submit" })).toBeDisabled();
  });

  it("registers when all fields are valid and submit is clicked", async () => {
    renderRegister(makeStore(filledUser));
    fireEvent.click(screen.getByRole("button", { name: "register.submit" }));
    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          path: "/auth/register",
          body: {
            first_name: "Jane",
            last_name: "Doe",
            email: "jane@example.com",
            password: "secret",
          },
        })
      );
    });
  });

  it("shows a password mismatch error and keeps submit disabled", () => {
    renderRegister(
      makeStore({ user: { ...filledUser.user, repeatPassword: "different" } })
    );
    expect(screen.getByText("register.password-mismatch")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "register.submit" })).toBeDisabled();
  });

  it("shows a localized error when the user already exists", () => {
    renderRegister(
      makeStore({ error: { active: true, code: "REGISTER_USER_ALREADY_EXISTS" } })
    );
    expect(screen.getByText("register.user-already-exists")).toBeInTheDocument();
  });

  it("navigates to the login page via the account link", () => {
    renderRegister(makeStore());
    fireEvent.click(screen.getByRole("button", { name: "register.already-have-account" }));
    expect(screen.getByTestId("location")).toHaveTextContent("/login");
  });

  it("redirects to home when already logged in", () => {
    renderRegister(makeStore({ loggedIn: true }));
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
