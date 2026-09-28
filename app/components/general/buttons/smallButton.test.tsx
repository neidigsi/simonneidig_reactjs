// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import SmallButton from "@/components/general/buttons/smallButton";

// Mocking the Icon component to avoid rendering it during tests
jest.mock("@/components/general/icon", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <span data-testid="mock-icon" className={props.className}></span>
    ),
  };
});

describe("SmallButton Component", () => {
  /**
   * Test to check if the button renders with default props.
   */
  it("renders with default props", () => {
    const handleClick = jest.fn();

    render(<SmallButton title="Settings" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "sm-btn-default");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  /**
   * Test if the onClick handler is called when clicked.
   */
  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(<SmallButton title="Settings" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test to check if the icon is rendered when provided.
   */
  it("renders the icon when provided", () => {
    const handleClick = jest.fn();

    render(
      <SmallButton title="Settings" icon="mock-icon" onClick={handleClick} />
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  /**
   * Test to check if no icon is rendered when not provided.
   */
  it("renders no icon when icon prop is missing", () => {
    const handleClick = jest.fn();

    render(<SmallButton title="Settings" onClick={handleClick} />);

    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  /**
   * Test to check if children are rendered.
   */
  it("renders children when provided", () => {
    const handleClick = jest.fn();

    render(
      <SmallButton title="Settings" onClick={handleClick}>
        <span>child-content</span>
      </SmallButton>
    );

    expect(screen.getByText("child-content")).toBeInTheDocument();
  });

  /**
   * Test to check disabled state and custom id/className.
   */
  it("applies disabled state, custom id and className", () => {
    const handleClick = jest.fn();

    render(
      <SmallButton
        id="my-sm-btn"
        title="Settings"
        onClick={handleClick}
        disabled
        className="custom-class"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "my-sm-btn");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("custom-class");
  });

  /**
   * Test to check if hover applies the primary style class.
   */
  it("applies hover style on mouse enter and removes it on leave", () => {
    const handleClick = jest.fn();

    render(<SmallButton title="Settings" onClick={handleClick} />);
    const button = screen.getByRole("button");

    fireEvent.mouseEnter(button);
    expect(button).toHaveClass("glass-button-primary");

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveClass("glass-button-primary");
  });
});
