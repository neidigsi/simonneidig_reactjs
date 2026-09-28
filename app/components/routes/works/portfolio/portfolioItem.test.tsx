// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import PortfolioItem from "@/components/routes/works/portfolio/portfolioItem";
import type { Portfolio } from "@/store/slices/worksSlice";

const basePortfolio: Portfolio = {
  id: 1,
  color: "secondary",
  title: "Project A",
  url: "https://a.example.com",
  categories: [{ name: "Web" }, { name: "Design" }],
  thumbnail_id: 42,
};

describe("PortfolioItem Component", () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  /**
   * Test to check if title, categories and thumbnail render.
   */
  it("renders title, categories and thumbnail", () => {
    render(<PortfolioItem index={0} portfolio={basePortfolio} />);

    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Web, Design")).toBeInTheDocument();

    const img = screen.getByAltText("Project A");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("42"));
  });

  /**
   * Test to check if falsy categories are filtered out of the label.
   */
  it("filters out empty categories", () => {
    render(
      <PortfolioItem
        index={0}
        portfolio={{
          ...basePortfolio,
          categories: [{ name: "Web" }, null as any, { name: "" }],
        }}
      />
    );

    expect(screen.getByText("Web")).toBeInTheDocument();
  });

  /**
   * Test to check if clicking the card opens the portfolio URL in a new tab.
   */
  it("opens portfolio url in a new tab on click", () => {
    render(<PortfolioItem index={0} portfolio={basePortfolio} />);

    fireEvent.click(screen.getByRole("button"));

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      "https://a.example.com",
      "_blank"
    );
  });
});
