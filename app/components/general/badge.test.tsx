// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import Badge from "@/components/general/badge";

describe("Badge Component", () => {
  /**
   * Test to check if the badge renders the given text.
   */
  it("renders the given text", () => {
    render(<Badge text="Hello" additionalClasses="" />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  /**
   * Test to check if additional classes are applied.
   */
  it("applies additional classes", () => {
    const { container } = render(
      <Badge text="Styled" additionalClasses="custom-class" />
    );

    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("custom-class");
    expect(badge).toHaveClass("glass-badge");
  });

  /**
   * Test to check if base styling classes are always present.
   */
  it("always applies base styling classes", () => {
    const { container } = render(<Badge text="Base" additionalClasses="" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("flex");
    expect(badge).toHaveClass("rounded-2xl");
  });

  /**
   * Test to check if empty text renders an empty badge.
   */
  it("renders empty badge when text is empty", () => {
    const { container } = render(<Badge text="" additionalClasses="" />);

    const badge = container.firstChild as HTMLElement;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("");
  });
});
