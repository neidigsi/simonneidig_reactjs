import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SocialMedia from "@/components/sidebar/socialMedia/socialMedia";
import socialMediaReducer from "@/store/slices/socialMediaSlice";
import settingsReducer from "@/store/slices/settingsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn().mockResolvedValue({ status: 200, data: [] }),
}));

function makeStore(socialMedia: any[], loaded: boolean) {
  return configureStore({
    reducer: { socialMedia: socialMediaReducer, settings: settingsReducer },
    preloadedState: {
      socialMedia: { loaded, socialMedia },
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

describe("SocialMedia", () => {
  it("renders a button per social media entry", () => {
    const store = makeStore(
      [
        { name: "github", url: "https://github.com/x", color: "#000", path: "M0 0h24v24H0z" },
        { name: "linkedin", url: "https://linkedin.com/x", color: "#0077b5", path: "M0 0h24v24H0z" },
      ],
      true
    );
    render(
      <Provider store={store}>
        <SocialMedia />
      </Provider>
    );
    expect(screen.getByRole("button", { name: "Open github in a new tab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open linkedin in a new tab" })).toBeInTheDocument();
  });

  it("renders nothing when list is empty", () => {
    const store = makeStore([], true);
    const { container } = render(
      <Provider store={store}>
        <SocialMedia />
      </Provider>
    );
    expect(container.querySelectorAll("button").length).toBe(0);
  });

  it("dispatches loadSocialMedia when not loaded", () => {
    const store = makeStore([], false);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <SocialMedia />
      </Provider>
    );
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("does not dispatch load when already loaded", () => {
    const store = makeStore([], true);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    dispatchSpy.mockClear();
    render(
      <Provider store={store}>
        <SocialMedia />
      </Provider>
    );
    // useEffect still runs but guard prevents loadSocialMedia thunk;
    // only assertion: no pending thunk with loadSocialMedia type prefix dispatched
    const calls: any[] = dispatchSpy.mock.calls.map((c) => c[0]);
    const hasLoad = calls.some(
      (a) => typeof a === "function" || (a && typeof a.type === "string" && a.type.includes("loadSocialMedia"))
    );
    expect(hasLoad).toBe(false);
  });
});
