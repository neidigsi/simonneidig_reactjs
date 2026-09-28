// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import TextButton from "@/components/general/buttons/textButton";

describe("TextButton Component", () => {
  /**
   * Test to check if the button renders with default props.
   */
  it("renders with default props", () => {
    const handleClick = jest.fn();

    render(<TextButton text="Click me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "sm-btn-default");
    expect(button).toHaveClass("text-black");
  });

  /**
   * Test if the onClick handler is called when clicked.
   */
  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<TextButton text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test to check if active styling is applied when active.
   */
  it("applies active styles when active", () => {
    const handleClick = jest.fn();

    render(<TextButton text="Active" active={true} onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-primary");
    expect(button).toHaveClass("liquid-underline-active");
  });

  /**
   * Test to check if inactive styling is applied when not active.
   */
  it("applies inactive styles when not active", () => {
    const handleClick = jest.fn();

    render(<TextButton text="Inactive" active={false} onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("liquid-underline-active");
  });

  /**
   * Test to check custom id and className.
   */
  it("uses custom id and className if provided", () => {
    const handleClick = jest.fn();

    render(
      <TextButton
        id="my-text-btn"
        text="Custom"
        onClick={handleClick}
        className="custom-class"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "my-text-btn");
    expect(button).toHaveClass("custom-class");
  });
});
