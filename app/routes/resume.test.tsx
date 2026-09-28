import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import Resume from "@/routes/resume";
import experienceReducer from "@/store/slices/experienceSlice";
import educationReducer from "@/store/slices/educationSlice";
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

jest.mock("@/components/routes/resume/experience/experienceList", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-experience-list" />,
}));

jest.mock("@/components/routes/resume/education/educationList", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-education-list" />,
}));

jest.mock("@/assets/css/main.css", () => ({}));

const mockHttp = http as jest.Mock;

const loadedState = {
  experience: { loaded: true, experiences: [] },
  education: { loaded: true, educations: [] },
  settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
};

function makeStore(preloadedState: typeof loadedState) {
  return configureStore({
    reducer: { experience: experienceReducer, education: educationReducer, settings: settingsReducer },
    preloadedState,
  });
}

function renderResume(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/resume"]}>
        <Resume />
      </MemoryRouter>
    </Provider>
  );
}

describe("Resume route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders experience and education lists with a localized title", () => {
    renderResume(makeStore(loadedState));
    expect(screen.getByText("main.resume.title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-experience-list")).toBeInTheDocument();
    expect(screen.getByTestId("mock-education-list")).toBeInTheDocument();
    expect(document.title).toBe("main.resume.title | Simon Neidig");
  });

  it("loads experiences and educations when not loaded yet", async () => {
    renderResume(
      makeStore({
        ...loadedState,
        experience: { loaded: false, experiences: [] },
        education: { loaded: false, educations: [] },
      })
    );
    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "GET", path: "/experience/" })
      );
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "GET", path: "/education/" })
      );
    });
  });
});
