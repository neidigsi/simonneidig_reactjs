// Import external dependencies
import { render, screen } from "@testing-library/react";

// Import internal dependencies
import ExpertiseItem from "@/components/routes/about/expertiseItem";

// Mock the Icon component to assert the icon name prop
jest.mock("@/components/general/icon", () => {
  return {
    __esModule: true,
    default: ({ icon }: { icon: string }) => (
      <span data-testid="mock-icon">{icon}</span>
    ),
  };
});

describe("ExpertiseItem Component", () => {
  /**
   * Test to check if the expertise title, description and icon render.
   */
  it("renders expertise title, description and icon", () => {
    render(
      <ExpertiseItem
        index={0}
        color="primary"
        expertise="Web Development"
        description="Building modern web apps"
        icon="CodeBracketIcon"
      />
    );

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Building modern web apps")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveTextContent("CodeBracketIcon");
  });

  /**
   * Test to check if a second item with different index/color/icon renders.
   */
  it("renders with different index, color and icon", () => {
    render(
      <ExpertiseItem
        index={1}
        color="secondary"
        expertise="Design"
        description="UI/UX design"
        icon="PaintBrushIcon"
      />
    );

    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("UI/UX design")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveTextContent("PaintBrushIcon");
  });
});
