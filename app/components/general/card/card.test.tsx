// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import Card from "@/components/general/card/card";

// Mock Loader to observe the loading state
jest.mock("@/components/general/loader/loader", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-loader" />,
  };
});

// Mock Footer to avoid i18n/router dependencies
jest.mock("@/components/general/footer/footer", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-footer" />,
  };
});

describe("Card Component", () => {
  /**
   * Test to check if the card renders headline and children by default.
   */
  it("renders headline, children and footer by default", () => {
    render(
      <Card headline="My Headline">
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText("My Headline")).toBeInTheDocument();
    expect(screen.getByText("Card content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-loader")).not.toBeInTheDocument();
  });

  /**
   * Test to check if the loader renders when not loaded.
   */
  it("renders loader instead of children when not loaded", () => {
    render(
      <Card headline="Loading Card" loaded={false}>
        <p>Hidden content</p>
      </Card>
    );

    expect(screen.getByTestId("mock-loader")).toBeInTheDocument();
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });

  /**
   * Test to check if the footer is hidden when footer is false.
   */
  it("hides footer when footer is false", () => {
    render(
      <Card headline="No Footer" footer={false}>
        <p>Content</p>
      </Card>
    );

    expect(screen.queryByTestId("mock-footer")).not.toBeInTheDocument();
  });

  /**
   * Test to check if custom className is applied.
   */
  it("applies custom className", () => {
    const { container } = render(
      <Card headline="Styled" className="custom-class">
        <p>Content</p>
      </Card>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  /**
   * Test to check if loaded defaults to true when omitted.
   */
  it("shows children by default without loaded prop", () => {
    render(
      <Card headline="Default Loaded">
        <p>Visible content</p>
      </Card>
    );

    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });
});
