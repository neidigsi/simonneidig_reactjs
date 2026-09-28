import { render, screen } from "@testing-library/react";
import LoginLayout from "@/layouts/loginLayout";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

describe("LoginLayout", () => {
  it("renders a full-screen background with liquid orbs", () => {
    const { container } = render(<LoginLayout />);
    const background = container.firstChild as HTMLElement;
    expect(background.className).toContain("w-screen");
    expect(background.className).toContain("h-screen");
    expect(background.className).toContain("overflow-hidden");
    expect(container.querySelector(".liquid-orbs")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-1")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-2")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-3")).toBeInTheDocument();
  });

  it("renders the current route outlet inside the store provider", () => {
    render(<LoginLayout />);
    // Outlet consumes no store itself; rendering proves the provider tree mounts.
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
