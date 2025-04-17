// Import external dependencies
import { render } from "@testing-library/react";

// Import internal dependencies
import InputLabel from "@/components/general/input/inputLabel";

describe("InputLabel Component", () => {
  /**
   * Test to check if the InputLabel renders with default props.
   * It verifies that the label is associated with the correct input element.
   */
  it("renders with correct htmlFor attribute", () => {
    const { getByText } = render(
      <InputLabel htmlFor="test-input" shouldFloat={false} label="Test Label" />
    );

    const label = getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-input");
  });

  /**
   * Test to check if the label applies the floating class when shouldFloat is true.
   */
  it("applies floating class when shouldFloat is true", () => {
    const { getByText } = render(
      <InputLabel htmlFor="test-input" shouldFloat={true} label="Test Label" />
    );

    const label = getByText("Test Label");
    expect(label).toHaveClass("translate-y-0 scale-90");
  });

  /**
   * Test to check if the label applies the default class when shouldFloat is false.
   */
  it("applies default class when shouldFloat is false", () => {
    const { getByText } = render(
      <InputLabel htmlFor="test-input" shouldFloat={false} label="Test Label" />
    );

    const label = getByText("Test Label");
    expect(label).toHaveClass("translate-y-6 scale-100");
  });

  /**
   * Test to check if the label has the correct text content.
   */
  it("renders the correct label text", () => {
    const { getByText } = render(
      <InputLabel htmlFor="test-input" shouldFloat={false} label="Test Label" />
    );

    const label = getByText("Test Label");
    expect(label).toHaveTextContent("Test Label");
  });
});
