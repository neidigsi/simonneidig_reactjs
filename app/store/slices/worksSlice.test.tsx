// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadWorks, filterWorks } from "@/store/slices/worksSlice";
import type { Portfolio } from "@/store/slices/worksSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

const portfolio: Portfolio[] = [
  {
    id: 1,
    color: "",
    title: "Project A",
    url: "https://a.example.com",
    categories: [{ name: "Web" }],
    thumbnail_id: 10,
  },
  {
    id: 2,
    color: "",
    title: "Project B",
    url: "https://b.example.com",
    categories: [{ name: "App" }],
    thumbnail_id: 11,
  },
  {
    id: 3,
    color: "",
    title: "Project C",
    url: "https://c.example.com",
    categories: [{ name: "Web" }],
    thumbnail_id: 12,
  },
];

describe("worksSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      currentFilter: "All",
      portfolio: [],
      filteredPortfolio: [],
      categories: [],
    });
  });

  it("loadWorks.pending sets loaded to false", () => {
    const next = reducer(
      {
        loaded: true,
        currentFilter: "All",
        portfolio,
        filteredPortfolio: portfolio,
        categories: ["All"],
      },
      loadWorks.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadWorks.fulfilled assigns colors and extracts sorted categories", () => {
    const next = reducer(
      {
        loaded: false,
        currentFilter: "All",
        portfolio: [],
        filteredPortfolio: [],
        categories: [],
      },
      loadWorks.fulfilled(
        portfolio.map((item) => ({ ...item })),
        "request-id",
        { language: "en" }
      )
    );
    expect(next.loaded).toBe(true);
    expect(next.portfolio.map((item) => item.color)).toEqual([
      "secondary",
      "primary",
      "primary",
    ]);
    expect(next.portfolio.map((item) => item.index)).toEqual([0, 1, 2]);
    expect(next.filteredPortfolio).toEqual(next.portfolio);
    expect(next.categories).toEqual(["All", "App", "Web"]);
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = {
      loaded: true,
      currentFilter: "Web",
      portfolio,
      filteredPortfolio: portfolio,
      categories: ["All", "Web"],
    };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      currentFilter: "All",
      portfolio: [],
      filteredPortfolio: [],
      categories: [],
    });
  });

  it("filterWorks with All shows the whole portfolio", () => {
    const prev = {
      loaded: true,
      currentFilter: "Web",
      portfolio,
      filteredPortfolio: [],
      categories: ["All", "App", "Web"],
    };
    const next = reducer(prev, filterWorks("All"));
    expect(next.currentFilter).toBe("All");
    expect(next.filteredPortfolio).toEqual(portfolio);
  });

  it("filterWorks filters by category and reassigns colors", () => {
    const prev = {
      loaded: true,
      currentFilter: "All",
      portfolio,
      filteredPortfolio: portfolio,
      categories: ["All", "App", "Web"],
    };
    const next = reducer(prev, filterWorks("Web"));
    expect(next.currentFilter).toBe("Web");
    expect(next.filteredPortfolio.map((item) => item.id)).toEqual([1, 3]);
    expect(next.filteredPortfolio.map((item) => item.color)).toEqual([
      "secondary",
      "primary",
    ]);
  });

  it("filterWorks ignores items without a categories array", () => {
    const itemWithoutCategories = {
      id: 4,
      color: "",
      title: "Project D",
      url: "https://d.example.com",
      categories: undefined as unknown as { name: string }[],
      thumbnail_id: 13,
    };
    const prev = {
      loaded: true,
      currentFilter: "All",
      portfolio: [...portfolio, itemWithoutCategories],
      filteredPortfolio: [],
      categories: [],
    };
    const next = reducer(prev, filterWorks("Web"));
    expect(next.filteredPortfolio.map((item) => item.id)).toEqual([1, 3]);
  });

  it("loadWorks thunk fetches works and updates the state", async () => {
    mockHttp.mockResolvedValue({
      data: portfolio.map((item) => ({ ...item })),
    });
    const store = configureStore({ reducer: { works: reducer } });

    await store.dispatch(loadWorks({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/work/",
      language: "en",
    });
    const state = store.getState().works;
    expect(state.loaded).toBe(true);
    expect(state.portfolio).toHaveLength(3);
    expect(state.categories).toEqual(["All", "App", "Web"]);
  });
});
