// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import Icon from "@/components/general/icon";

describe("Icon Component", () => {
  /**
   * Test to check if a valid heroicon renders with the given className.
   */
  it("renders a valid icon with custom className", () => {
    const { container } = render(
      <Icon icon="AcademicCapIcon" className="size-5" />
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("size-5");
  });

  /**
   * Test to check if the icon renders without a className by default.
   */
  it("renders with default empty className", () => {
    const { container } = render(<Icon icon="AcademicCapIcon" />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  /**
   * Test to check if an unknown icon name renders the fallback icon
   * and logs an error.
   */
  it("renders fallback icon and logs error for unknown icon", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { container } = render(
      <Icon icon="NonExistentIcon" className="fallback-class" />
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Icon "NonExistentIcon" not found. Using fallback icon.'
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("fallback-class");

    consoleSpy.mockRestore();
  });
});
