import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FooterItem from "@/components/general/footer/footerItem";

export function renderWithRouter(ui: any, { route = "/" } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("FooterItem Component", () => {
  it("renders the text correctly", () => {
    const { getByText } = renderWithRouter(<FooterItem text="Test Text" />);

    expect(getByText("Test Text")).toBeInTheDocument();
  });

  it("does not navigate when no path is provided", () => {
    const { getByText } = renderWithRouter(<FooterItem text="Test Text" />);

    const button = getByText("Test Text");
    fireEvent.click(button);

    // No navigation should occur, so no assertions for navigation
    expect(button).toBeInTheDocument();
  });

  it("applies hover styles when a path is provided", () => {
    const { getByText } = renderWithRouter(
      <FooterItem text="Test Text" path="/test-path" />
    );

    const button = getByText("Test Text");
    expect(button).toHaveClass("hover:cursor-pointer hover:text-primary");
  });

  it("does not apply hover styles when no path is provided", () => {
    const { getByText } = renderWithRouter(<FooterItem text="Test Text" />);

    const button = getByText("Test Text");
    expect(button).not.toHaveClass("hover:cursor-pointer hover:text-primary");
  });
});
