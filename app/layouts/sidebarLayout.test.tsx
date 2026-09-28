import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import i18n from "i18next";
import SidebarLayout from "@/layouts/sidebarLayout";
import personalDetailsReducer from "@/store/slices/personalDetailsSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";
import socialMediaReducer from "@/store/slices/socialMediaSlice";
import userReducer from "@/store/slices/userSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  __esModule: true,
  default: { get: jest.fn().mockReturnValue(""), set: jest.fn(), remove: jest.fn() },
}));

jest.mock("@/components/sidebar/sidebar", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-sidebar" />,
}));

jest.mock("@/components/navigation/navigation", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-navigation" />,
}));

jest.mock("@/components/actionBar/actionBar", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-action-bar" />,
}));

const mockHttp = http as jest.Mock;

const loadedState = {
  personalDetails: { loaded: true, name: "Jane", position: "Dev", abstract: "", profilePictureId: undefined },
  personalInfo: { loaded: true, information: [] },
  socialMedia: { loaded: true, socialMedia: [] },
  user: {
    loaded: true,
    loggedIn: false,
    jwt: "",
    error: { active: false, code: "" },
    user: { firstName: "", lastName: "", email: "", password: "", repeatPassword: "", isSuperUser: false },
  },
  settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
};

const unloadedState = {
  ...loadedState,
  personalDetails: { ...loadedState.personalDetails, loaded: false },
  personalInfo: { ...loadedState.personalInfo, loaded: false },
  socialMedia: { ...loadedState.socialMedia, loaded: false },
};

function makeStore(preloadedState: typeof loadedState) {
  const store = configureStore({
    reducer: {
      personalDetails: personalDetailsReducer,
      personalInfo: personalInfoReducer,
      socialMedia: socialMediaReducer,
      user: userReducer,
      settings: settingsReducer,
    },
    preloadedState,
  });
  // Isolate rendering from async thunks; effects dispatch into this spy instead.
  store.dispatch = jest.fn();
  return store;
}

function renderLayout(store: ReturnType<typeof makeStore>, children = "page-content") {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <SidebarLayout>{children}</SidebarLayout>
      </MemoryRouter>
    </Provider>
  );
}

describe("SidebarLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: {} });
  });

  it("shows a loader while personal data is still loading", () => {
    const { container } = renderLayout(makeStore(unloadedState));
    expect(screen.queryByTestId("mock-sidebar")).not.toBeInTheDocument();
    expect(screen.queryByText("page-content")).not.toBeInTheDocument();
    expect(container.querySelector(".grid.h-screen.w-screen")).toBeInTheDocument();
  });

  it("renders sidebar, navigation, action bars and children once loaded", () => {
    renderLayout(makeStore(loadedState));
    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-navigation")).toBeInTheDocument();
    // One action bar for small screens, one for medium and larger screens.
    expect(screen.getAllByTestId("mock-action-bar")).toHaveLength(2);
    expect(screen.getByText("page-content")).toBeInTheDocument();
  });

  it("stores the current language on mount", () => {
    const store = makeStore(loadedState);
    renderLayout(store);
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "settings/changeLanguage", payload: i18n.language })
    );
  });
});
