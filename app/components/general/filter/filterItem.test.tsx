// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import FilterItem from "@/components/general/filter/filterItem";

describe("FilterItem Component", () => {
  /**
   * Test to check if the filter item renders with the given text and id.
   */
  it("renders the item text with generated id", () => {
    const handleClick = jest.fn();

    render(<FilterItem item="All" active={false} onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "All" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "txt-btn-filter-item-All");
  });

  /**
   * Test to check if active styling is applied when active.
   */
  it("applies active styles when active", () => {
    const handleClick = jest.fn();

    render(<FilterItem item="Active" active={true} onClick={handleClick} />);

    expect(screen.getByRole("button")).toHaveClass(
      "liquid-underline-active"
    );
  });

  /**
   * Test to check if active styling is absent when inactive.
   */
  it("does not apply active styles when inactive", () => {
    const handleClick = jest.fn();

    render(<FilterItem item="Active" active={false} onClick={handleClick} />);

    expect(screen.getByRole("button")).not.toHaveClass(
      "liquid-underline-active"
    );
  });

  /**
   * Test to check if onClick is called when clicked.
   */
  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<FilterItem item="All" active={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
