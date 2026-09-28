import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import Profile from "@/routes/profile";
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
  loggedIn: true,
  jwt: "token",
  error: { active: false, code: "" },
  user: {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    password: "",
    repeatPassword: "",
    isSuperUser: false,
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

function renderProfile(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile />
        <LocationProbe />
      </MemoryRouter>
    </Provider>
  );
}

describe("Profile route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({
      status: 200,
      data: { first_name: "Jane", last_name: "Doe", email: "jane@example.com" },
    });
  });

  it("renders the profile form with stored user data", () => {
    renderProfile(makeStore());
    expect(screen.getByText("profile.title")).toBeInTheDocument();
    expect(screen.getByLabelText("profile.first-name")).toHaveValue("Jane");
    expect(screen.getByLabelText("profile.last-name")).toHaveValue("Doe");
    expect(screen.getByLabelText("profile.email")).toHaveValue("jane@example.com");
    expect(screen.getByRole("button", { name: "profile.save" })).not.toBeDisabled();
  });

  it("redirects to login when not authenticated", () => {
    renderProfile(makeStore({ loggedIn: false }));
    expect(screen.getByTestId("location")).toHaveTextContent("/login");
  });

  it("disables save for empty required fields and flags invalid email", () => {
    renderProfile(
      makeStore({ user: { ...baseUserState.user, firstName: "", email: "invalid" } })
    );
    expect(screen.getByRole("button", { name: "profile.save" })).toBeDisabled();
    expect(screen.getByText("profile.email-invalid")).toBeInTheDocument();
  });

  it("flags a password mismatch", () => {
    renderProfile(
      makeStore({ user: { ...baseUserState.user, password: "a", repeatPassword: "b" } })
    );
    expect(screen.getByText("profile.password-mismatch")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "profile.save" })).toBeDisabled();
  });

  it("saves the profile and shows a success notification", async () => {
    renderProfile(makeStore());
    fireEvent.click(screen.getByRole("button", { name: "profile.save" }));
    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "PATCH", path: "/users/me" })
      );
    });
    expect(await screen.findByText("profile.update-success")).toBeInTheDocument();
  });
});
