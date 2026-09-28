import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PersonalInfo from "@/components/sidebar/personalInfo/personalInfo";
import personalInfoReducer from "@/store/slices/personalInfoSlice";
import settingsReducer from "@/store/slices/settingsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn().mockResolvedValue({ status: 200, data: [] }),
}));

function makeStore(information: any[], loaded: boolean) {
  return configureStore({
    reducer: { personalInfo: personalInfoReducer, settings: settingsReducer },
    preloadedState: {
      personalInfo: { loaded, information },
      settings: { language: "en", isDarkModeEnabled: false, backButtonEnabled: false },
    },
  });
}

describe("PersonalInfo", () => {
  it("renders all information items", () => {
    const store = makeStore(
      [
        { label: "Email", value: "a@b.c", icon: "EnvelopeIcon" },
        { label: "Phone", value: "123", icon: "PhoneIcon" },
      ],
      true
    );
    render(
      <Provider store={store}>
        <PersonalInfo />
      </Provider>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("a@b.c")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("renders divider between items but not after last", () => {
    const store = makeStore(
      [
        { label: "A", value: "1", icon: "EnvelopeIcon" },
        { label: "B", value: "2", icon: "PhoneIcon" },
      ],
      true
    );
    const { container } = render(
      <Provider store={store}>
        <PersonalInfo />
      </Provider>
    );
    expect(container.querySelectorAll(".liquid-divider").length).toBe(1);
  });

  it("renders no divider for single item", () => {
    const store = makeStore([{ label: "A", value: "1", icon: "EnvelopeIcon" }], true);
    const { container } = render(
      <Provider store={store}>
        <PersonalInfo />
      </Provider>
    );
    expect(container.querySelectorAll(".liquid-divider").length).toBe(0);
  });

  it("dispatches loadPersonalInfo when not loaded", () => {
    const store = makeStore([], false);
    const dispatchSpy = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <PersonalInfo />
      </Provider>
    );
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
