import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import Works from "@/routes/works";
import worksReducer from "@/store/slices/worksSlice";
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

jest.mock("@/components/routes/works/portfolio/portfolioList", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-portfolio-list" />,
}));

jest.mock("@/assets/css/main.css", () => ({}));

const mockHttp = http as jest.Mock;

const loadedState = {
  works: { loaded: true, currentFilter: "All", portfolio: [], filteredPortfolio: [], categories: [] },
  settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
};

function makeStore(preloadedState: typeof loadedState) {
  return configureStore({
    reducer: { works: worksReducer, settings: settingsReducer },
    preloadedState,
  });
}

function renderWorks(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/works"]}>
        <Works />
      </MemoryRouter>
    </Provider>
  );
}

describe("Works route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({ status: 200, data: [] });
  });

  it("renders the portfolio list with a localized title", () => {
    renderWorks(makeStore(loadedState));
    expect(screen.getByText("main.works.title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-portfolio-list")).toBeInTheDocument();
    expect(document.title).toBe("main.works.title | Simon Neidig");
  });

  it("loads works when not loaded yet", async () => {
    renderWorks(
      makeStore({
        ...loadedState,
        works: { ...loadedState.works, loaded: false },
      })
    );
    await waitFor(() => {
      expect(mockHttp).toHaveBeenCalledWith(
        expect.objectContaining({ method: "GET", path: "/work/" })
      );
    });
  });
});
