// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import PortfolioList from "@/components/routes/works/portfolio/portfolioList";
import worksReducer, { Portfolio } from "@/store/slices/worksSlice";

// Mock the http layer used by the works slice thunk
jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const portfolio: Portfolio[] = [
  {
    id: 1,
    color: "secondary",
    title: "Project A",
    url: "https://a.example.com",
    categories: [{ name: "Web" }],
    thumbnail_id: 1,
  },
  {
    id: 2,
    color: "primary",
    title: "Project B",
    url: "https://b.example.com",
    categories: [{ name: "Design" }],
    thumbnail_id: 2,
  },
];

function makeStore(filteredPortfolio: Portfolio[]) {
  return configureStore({
    reducer: { works: worksReducer },
    preloadedState: {
      works: {
        loaded: true,
        currentFilter: "All",
        portfolio,
        filteredPortfolio,
        categories: ["All", "Design", "Web"],
      },
    },
  });
}

describe("PortfolioList Component", () => {
  /**
   * Test to check if all portfolio items and filter buttons render.
   */
  it("renders filter and all portfolio items", () => {
    render(
      <Provider store={makeStore(portfolio)}>
        <PortfolioList />
      </Provider>
    );

    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Web" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Design" })
    ).toBeInTheDocument();
  });

  /**
   * Test to check if clicking a filter button filters the portfolio list.
   */
  it("filters portfolio items on filter click", () => {
    render(
      <Provider store={makeStore(portfolio)}>
        <PortfolioList />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Web" }));

    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.queryByText("Project B")).not.toBeInTheDocument();
  });

  /**
   * Test to check if an empty filtered portfolio renders no items.
   */
  it("renders no items when filtered portfolio is empty", () => {
    render(
      <Provider store={makeStore([])}>
        <PortfolioList />
      </Provider>
    );

    expect(screen.queryByText("Project A")).not.toBeInTheDocument();
    expect(screen.queryByText("Project B")).not.toBeInTheDocument();
  });
});
