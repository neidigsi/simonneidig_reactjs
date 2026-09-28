import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import Page from "@/routes/page";
import pageReducer from "@/store/slices/pageSlice";
import settingsReducer from "@/store/slices/settingsSlice";
import { http } from "@/networking/httpRequest";

jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    useParams: () => ({ path: "imprint" }),
  };
});

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("@/assets/css/main.css", () => ({}));

const mockHttp = http as jest.Mock;

function makeStore() {
  return configureStore({
    reducer: { page: pageReducer, settings: settingsReducer },
    preloadedState: {
      page: { loaded: false, title: "", html: "" },
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

describe("Page route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockHttp.mockResolvedValue({
      data: { title: "Imprint", html: "<p>legal-text</p>" },
    });
  });

  it("loads page content for the route param and renders it", async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/page/imprint"]}>
          <Page />
        </MemoryRouter>
      </Provider>
    );

    expect(mockHttp).toHaveBeenCalledWith(
      expect.objectContaining({ method: "GET", path: "/page/imprint", language: "en" })
    );
    expect(await screen.findByText("Imprint")).toBeInTheDocument();
    expect(await screen.findByText("legal-text")).toBeInTheDocument();
    expect(store.getState().settings.backButtonEnabled).toBe(true);
    expect(document.title).toBe("Imprint | Simon Neidig");
  });
});
