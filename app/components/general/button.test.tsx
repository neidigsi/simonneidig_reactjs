import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/general/button";

// ✅ Icon-Komponente mocken (CommonJS-kompatibel)
jest.mock('./icon', () => {
  return {
    __esModule: true, // wichtig für ESM-kompatibles Mocking
    default: (props: { icon: any; className: string }) => (
      <span data-testid="mock-icon" className={props.className}></span>
    ),
  };
});

describe('Button Component', () => {
  it('renders with default props', () => {
    const handleClick = jest.fn();

    render(<Button text="Click me" icon="mock-icon" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'btn-default');
    expect(button).toHaveClass('btn');
    expect(button).not.toBeDisabled();

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveClass('size-5 mr-2');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button text="Click" icon="mock-icon" onClick={handleClick} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies inverted and disabled styles', () => {
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

    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass('btn-inverted');
    expect(button).toHaveClass('btn-disabled');
    expect(button).toHaveClass('custom-class');
    expect(button).toBeDisabled();
  });

  it('uses custom id if provided', () => {
    const handleClick = jest.fn();

    render(
      <Button
        id="my-button"
        text="Custom ID"
        icon="mock-icon"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'my-button');
  });
});