import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router";
import NavigationItem from "@/components/navigation/navigationItem";
import settingsReducer from "@/store/slices/settingsSlice";

function makeStore() {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

function renderItem(props: { text: string; path: string; icon: string; active: boolean }, route = "/") {
  const store = makeStore();
  store.dispatch = jest.fn() as any;
  const ui = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <NavigationItem {...props} />
      </MemoryRouter>
    </Provider>
  );
  return { store, ...ui };
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe("NavigationItem", () => {
  it("renders text with aria-label and id", () => {
    renderItem({ text: "Home", path: "/", icon: "UserIcon", active: false });
    const btn = screen.getByRole("button", { name: "Home" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("id", "navigation-item-Home");
  });

  it("applies active class when active", () => {
    renderItem({ text: "Home", path: "/", icon: "UserIcon", active: true });
    expect(screen.getByRole("button", { name: "Home" })).toHaveClass("nav-item-active");
  });

  it("does not apply active class when inactive", () => {
    renderItem({ text: "Home", path: "/", icon: "UserIcon", active: false });
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveClass("nav-item-active");
  });

  it("dispatches setBackButtonEnabled and navigates when inactive and clicked", () => {
    const store = makeStore();
    (store as any).dispatch = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <NavigationItem text="Resume" path="/resume" icon="DocumentCheckIcon" active={false} />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Resume" }));
    expect((store.dispatch as jest.Mock)).toHaveBeenCalled();
    expect(screen.getByTestId("location")).toHaveTextContent("/resume");
  });

  it("does nothing when active and clicked", () => {
    const store = makeStore();
    (store as any).dispatch = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <NavigationItem text="Home" path="/" icon="UserIcon" active={true} />
          <LocationProbe />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Home" }));
    expect((store.dispatch as jest.Mock)).not.toHaveBeenCalled();
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
