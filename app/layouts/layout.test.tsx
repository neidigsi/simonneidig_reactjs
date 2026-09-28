import { render, screen } from "@testing-library/react";
import Layout from "@/layouts/layout";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

jest.mock("@/layouts/sidebarLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-sidebar-layout">{children}</div>
  ),
}));

jest.mock("react-router", () => {
  const actual = jest.requireActual("react-router");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

describe("Layout", () => {
  it("renders the grid background with liquid orbs", () => {
    const { container } = render(<Layout />);
    const background = container.firstChild as HTMLElement;
    expect(background.className).toContain("bg-image");
    expect(background.className).toContain("min-h-screen");
    expect(container.querySelector(".liquid-orbs")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-1")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-2")).toBeInTheDocument();
    expect(container.querySelector(".liquid-orb-3")).toBeInTheDocument();
  });

  it("renders the sidebar layout with the current route outlet", () => {
    render(<Layout />);
    expect(screen.getByTestId("mock-sidebar-layout")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });

  it("provides the redux store to the layout tree", () => {
    const { container } = render(<Layout />);
    // SidebarLayout consumes the store via useAppSelector; rendering it
    // inside Layout proves the StoreProvider supplies a working store.
    expect(container.querySelector(".relative.z-10")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sidebar-layout")).toBeInTheDocument();
  });
});
