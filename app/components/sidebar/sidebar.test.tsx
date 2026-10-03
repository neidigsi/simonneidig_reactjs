import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import Sidebar from "@/components/sidebar/sidebar";
import settingsReducer from "@/store/slices/settingsSlice";
import personalDetailsReducer from "@/store/slices/personalDetailsSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";
import socialMediaReducer from "@/store/slices/socialMediaSlice";

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

function makeStore(overrides: Partial<{ loaded: boolean; name: string; position: string }> = {}) {
  return configureStore({
    reducer: {
      settings: settingsReducer,
      personalDetails: personalDetailsReducer,
      personalInfo: personalInfoReducer,
      socialMedia: socialMediaReducer,
    },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
      personalDetails: {
        loaded: overrides.loaded ?? true,
        name: overrides.name ?? "John Doe",
        position: overrides.position ?? "Developer",
        abstract: "",
        profilePictureId: 1,
      },
      personalInfo: { loaded: true, information: [] },
      socialMedia: { loaded: true, socialMedia: [] },
    },
  });
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("Sidebar", () => {
  it("renders name, position and profile picture", () => {
    const store = makeStore({ name: "John Doe", position: "Developer" });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Simon Neidig – Freelance Softwareentwickler, Projektleitung & Business Analyse"
      )
    ).toBeInTheDocument();
  });

  it("renders contact button and navigates to /contact on click", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    const btn = screen.getByRole("button", { name: "sidebar.button" });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByTestId("location")).toHaveTextContent("/contact");
  });

  it("dispatches loadPersonalDetails when not loaded", () => {
    const store = makeStore({ loaded: false });
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("does not dispatch loadPersonalDetails when already loaded", () => {
    const store = makeStore({ loaded: true });
    const dispatchSpy = jest.spyOn(store, "dispatch");
    dispatchSpy.mockClear();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    );
    const calls: any[] = dispatchSpy.mock.calls.map((c) => c[0]);
    const hasLoad = calls.some(
      (a) =>
        typeof a === "function" ||
        (a && typeof a.type === "string" && a.type.includes("loadPersonalDetails"))
    );
    expect(hasLoad).toBe(false);
  });
});
