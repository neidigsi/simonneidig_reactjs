import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SocialMediaButton from "@/components/sidebar/socialMedia/socialMediaButton";
import settingsReducer from "@/store/slices/settingsSlice";

function makeStore(isDarkModeEnabled: boolean) {
  return configureStore({
    reducer: { settings: settingsReducer },
    preloadedState: {
      settings: { language: "en", isDarkModeEnabled, backButtonEnabled: false },
    },
  });
}

const props = {
  id: "github",
  path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385",
  color: "#181717",
  url: "https://github.com/test",
};

describe("SocialMediaButton", () => {
  it("renders with correct id and aria-label", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <SocialMediaButton {...props} />
      </Provider>
    );
    const btn = screen.getByRole("button", { name: "Open github in a new tab" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("id", "social-media-button-github");
  });

  it("opens url in new tab on click", () => {
    const store = makeStore(false);
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    render(
      <Provider store={store}>
        <SocialMediaButton {...props} />
      </Provider>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(openSpy).toHaveBeenCalledWith("https://github.com/test", "_blank", "noreferrer");
    openSpy.mockRestore();
  });

  it("applies active class on hover", () => {
    const store = makeStore(false);
    render(
      <Provider store={store}>
        <SocialMediaButton {...props} />
      </Provider>
    );
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveClass("glass-button-primary");
    fireEvent.mouseEnter(btn);
    expect(btn).toHaveClass("glass-button-primary");
    fireEvent.mouseLeave(btn);
    expect(btn).not.toHaveClass("glass-button-primary");
  });

  it("uses white fill when dark mode is enabled", () => {
    const store = makeStore(true);
    const { container } = render(
      <Provider store={store}>
        <SocialMediaButton {...props} />
      </Provider>
    );
    expect(container.querySelector("svg")).toHaveAttribute("fill", "#fff");
  });

  it("uses currentColor fill when light mode and not hovered", () => {
    const store = makeStore(false);
    const { container } = render(
      <Provider store={store}>
        <SocialMediaButton {...props} />
      </Provider>
    );
    expect(container.querySelector("svg")).toHaveAttribute("fill", "currentColor");
  });
});
