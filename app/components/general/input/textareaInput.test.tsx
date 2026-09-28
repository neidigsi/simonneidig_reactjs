// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import TextareaInput from "@/components/general/input/textareaInput";

describe("TextareaInput Component", () => {
  /**
   * Test to check if the TextareaInput renders with default props.
   * It checks if the input is in the document and has the correct placeholder.
   */
  it("renders with default props", () => {
    render(<TextareaInput label="Name" value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Name");
    expect(input).toHaveAttribute("id", "text-input");
  });

  /**
   * Test to check if the onChange handler is called when the input value changes.
   * It simulates typing into the input field.
   */
  it("calls onChange handler when value changes", () => {
    const handleChange = jest.fn();
    render(<TextareaInput label="Name" value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("John Doe");
  });

  /**
   * Test to check if the onChange handler passes the cleared value.
   */
  it("calls onChange with empty string when cleared", () => {
    const handleChange = jest.fn();
    render(
      <TextareaInput label="Name" value="John Doe" onChange={handleChange} />
    );

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "" } });
    expect(handleChange).toHaveBeenCalledWith("");
  });

  /**
   * Test to check if a custom id is applied.
   */
  it("uses custom id when provided", () => {
    render(
      <TextareaInput
        label="Message"
        value=""
        onChange={() => {}}
        id="custom-id"
      />
    );

    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "id",
      "custom-id"
    );
  });

  /**
   * Test to check if the label floats when the input is focused.
   * It simulates focusing on the input field.
   */
  it("floats the label when input is focused", () => {
    render(<TextareaInput label="Name" value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Name");
    fireEvent.focus(input);

    const label = screen.getByText("Name");
    expect(label).toHaveClass("translate-y-0 scale-90");
  });

  /**
   * Test to check if the label floats when the input has a value.
   * It renders the input with a pre-filled value.
   */
  it("floats the label when input has a value", () => {
    render(<TextareaInput label="Name" value="John Doe" onChange={() => {}} />);

    const label = screen.getByText("Name");
    expect(label).toHaveClass("translate-y-0 scale-90");
  });

  /**
   * Test to check if the label does not float when the input is empty and not focused.
   */
  it("does not float the label when input is empty and not focused", () => {
    render(<TextareaInput label="Name" value="" onChange={() => {}} />);

    const label = screen.getByText("Name");
    expect(label).toHaveClass("translate-y-6 scale-100");
  });

  /**
   * Test to check if blurring an empty input removes the float.
   */
  it("removes float after blur when input is empty", () => {
    render(<TextareaInput label="Name" value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Name");
    fireEvent.focus(input);
    expect(screen.getByText("Name")).toHaveClass("translate-y-0 scale-90");

    fireEvent.blur(input);
    expect(screen.getByText("Name")).toHaveClass("translate-y-6 scale-100");
  });
});
