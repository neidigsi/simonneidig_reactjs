// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import Button from "@/components/general/button/button";

// Mocking the Icon component to avoid rendering it during tests
jest.mock("@/components/general/icon", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <span data-testid="mock-icon" className={props.className}></span>
    ),
  };
});

describe("Button Component", () => {
  /**
   * Test to check if the button renders with default props.
   * It checks if the button is in the document, has the correct ID, class, and is not disabled.
   */
  it("renders with default props", () => {
    const handleClick = jest.fn();

    render(<Button text="Click me" icon="mock-icon" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "btn-default");
    expect(button).toHaveClass("btn");
    expect(button).not.toBeDisabled();

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toHaveClass("size-5 mr-2");
  });

  /**
   * Test if the given on click function is called when the button is clicked.
   * It renders the button with a click handler and simulates a click event.
   */
  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<Button text="Click" icon="mock-icon" onClick={handleClick} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test to check if the button applies inverted and disabled styles.
   * It renders the button with inverted and disabled props and checks if the classes are applied.
   */
  it("applies inverted and disabled styles", () => {
    const handleClick = jest.fn();

    render(
      <Button
        text="Test"
        icon="mock-icon"
        onClick={handleClick}
        inverted
        disabled
        className="custom-class"
      />
    );

    const button = screen.getByRole("button", { name: /test/i });
    expect(button).toHaveClass("btn-inverted");
    expect(button).toHaveClass("btn-disabled");
    expect(button).toHaveClass("custom-class");
    expect(button).toBeDisabled();
  });

  /**
   * Test to check if the button uses a custom ID if provided.
   * It renders the button with a specific ID and checks if the ID is set correctly.
   */
  it("uses custom id if provided", () => {
    const handleClick = jest.fn();

    render(
      <Button
        id="my-button"
        text="Custom ID"
        icon="mock-icon"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "my-button");
  });
});
