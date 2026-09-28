// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import Filter from "@/components/general/filter/filter";

describe("Filter Component", () => {
  const items = ["All", "Active", "Archived"];

  /**
   * Test to check if all filter items are rendered.
   */
  it("renders all filter items", () => {
    const handleClick = jest.fn();

    render(
      <Filter currentFilter="All" items={items} onClick={handleClick} />
    );

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Archived" })
    ).toBeInTheDocument();
  });

  /**
   * Test to check if the current filter item is marked active.
   */
  it("marks the current filter as active", () => {
    const handleClick = jest.fn();

    render(
      <Filter currentFilter="Active" items={items} onClick={handleClick} />
    );

    expect(screen.getByRole("button", { name: "Active" })).toHaveClass(
      "liquid-underline-active"
    );
    expect(screen.getByRole("button", { name: "All" })).not.toHaveClass(
      "liquid-underline-active"
    );
  });

  /**
   * Test to check if clicking a filter item calls onClick.
   */
  it("calls onClick when a filter item is clicked", () => {
    const handleClick = jest.fn();

    render(
      <Filter currentFilter="All" items={items} onClick={handleClick} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Archived" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test to check if no buttons render for an empty items array.
   */
  it("renders no items when items array is empty", () => {
    const handleClick = jest.fn();

    render(<Filter currentFilter="All" items={[]} onClick={handleClick} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  /**
   * Test to check if no item is active when currentFilter matches nothing.
   */
  it("marks nothing active when currentFilter matches no item", () => {
    const handleClick = jest.fn();

    render(
      <Filter currentFilter="Unknown" items={items} onClick={handleClick} />
    );

    items.forEach((item) => {
      expect(screen.getByRole("button", { name: item })).not.toHaveClass(
        "liquid-underline-active"
      );
    });
  });
});
