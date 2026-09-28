import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import About from "@/routes/about";
import personalDetailsReducer from "@/store/slices/personalDetailsSlice";
import personalInfoReducer from "@/store/slices/personalInfoSlice";
import expertiseReducer from "@/store/slices/expertiseSlice";
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

const loadedState = {
  personalDetails: { loaded: true, name: "Jane", position: "Dev", abstract: "<p>abstract-text</p>", profilePictureId: undefined },
  personalInfo: { loaded: true, information: [] },
  expertise: {
    loaded: true,
    expertises: [
      { id: 1, color: "secondary", title: "expertise-one", description: "desc-one", icon: "icon-one", sort: 1 },
      { id: 2, color: "primary", title: "expertise-two", description: "desc-two", icon: "icon-two", sort: 2 },
    ],
  },
  settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
};

function makeStore(preloadedState: typeof loadedState) {
  return configureStore({
    reducer: {
      personalDetails: personalDetailsReducer,
      personalInfo: personalInfoReducer,
      expertise: expertiseReducer,
      settings: settingsReducer,
    },
    preloadedState,
  });
}

function renderAbout(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <About />
      </MemoryRouter>
    </Provider>
  );
}

describe("About route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders abstract and expertises with a localized title", async () => {
    renderAbout(makeStore(loadedState));
    expect(screen.getByText("main.about.title")).toBeInTheDocument();
    expect(screen.getByText("abstract-text")).toBeInTheDocument();
    expect(screen.getByText("expertise-one")).toBeInTheDocument();
    expect(screen.getByText("expertise-two")).toBeInTheDocument();
    expect(screen.getByText("main.about.subtitle")).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe("main.about.title | Simon Neidig");
    });
  });

  it("loads personal info and expertises when not loaded yet", async () => {
    const store = makeStore({
      ...loadedState,
      personalInfo: { loaded: false, information: [] },
      expertise: { loaded: false, expertises: [] },
    });
    renderAbout(store);
    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "GET", path: "/personal-information/" })
      );
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "GET", path: "/expertise/" })
      );
    });
  });
});
