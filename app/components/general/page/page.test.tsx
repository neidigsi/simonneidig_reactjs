import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Page from "@/components/general/page/page";
import settingsReducer, { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import { MemoryRouter } from "react-router";

export function renderWithRouter(ui: any, { route = "/" } = {}) {
    return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
  }

describe("Page Component", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        settings: settingsReducer,
      },
      preloadedState: {
        settings: {
          backButtonEnabled: false,
          language: "en", // Add default value for language
          isDarkModeEnabled: false, // Add default value for isDarkModeEnabled
        },
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders the title and text correctly", () => {
    const { getByText } = renderWithRouter(
      <Provider store={store}>
        <Page title="Test Title" text="<p>Test Content</p>" />
      </Provider>
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("dispatches setBackButtonEnabled when backButtonEnabled is false", () => {
    renderWithRouter(
      <Provider store={store}>
        <Page title="Test Title" text="Test Content" />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(setBackButtonEnabled(true));
  });

  it("does not dispatch setBackButtonEnabled when backButtonEnabled is true", () => {
    store = configureStore({
      reducer: {
        settings: settingsReducer,
      },
      preloadedState: {
        settings: {
          backButtonEnabled: true,
          language: "en", // Add default value for language
          isDarkModeEnabled: false, // Add default value for isDarkModeEnabled
        },
      },
    });
    store.dispatch = jest.fn();

    renderWithRouter(
      <Provider store={store}>
        <Page title="Test Title" text="Test Content" />
      </Provider>
    );

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
