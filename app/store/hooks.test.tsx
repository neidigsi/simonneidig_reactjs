// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

// Import internal dependencies
import { makeStore } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

function TestComponent() {
  const language = useAppSelector((state) => state.settings.language);
  const backButtonEnabled = useAppSelector(
    (state) => state.settings.backButtonEnabled
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="back-button">{String(backButtonEnabled)}</span>
      <button onClick={() => dispatch(setBackButtonEnabled(true))}>
        enable back button
      </button>
    </div>
  );
}

describe("store hooks", () => {
  it("useAppSelector reads state from the store", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByTestId("language")).toHaveTextContent("en");
    expect(screen.getByTestId("back-button")).toHaveTextContent("false");
  });

  it("useAppDispatch dispatches actions that update the store", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /enable back button/i })
    );

    expect(screen.getByTestId("back-button")).toHaveTextContent("true");
    expect(store.getState().settings.backButtonEnabled).toBe(true);
  });
});
