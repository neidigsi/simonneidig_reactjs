// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import StoreProvider from "@/store/storeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

function Consumer() {
  const backButtonEnabled = useAppSelector(
    (state) => state.settings.backButtonEnabled
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <span data-testid="back-button">{String(backButtonEnabled)}</span>
      <button onClick={() => dispatch(setBackButtonEnabled(true))}>
        enable back button
      </button>
    </div>
  );
}

describe("StoreProvider", () => {
  it("provides the store context to children", () => {
    render(
      <StoreProvider>
        <Consumer />
      </StoreProvider>
    );

    expect(screen.getByTestId("back-button")).toHaveTextContent("false");

    fireEvent.click(
      screen.getByRole("button", { name: /enable back button/i })
    );

    expect(screen.getByTestId("back-button")).toHaveTextContent("true");
  });

  it("reuses the same store instance across rerenders", () => {
    const { rerender } = render(
      <StoreProvider>
        <Consumer />
      </StoreProvider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /enable back button/i })
    );
    expect(screen.getByTestId("back-button")).toHaveTextContent("true");

    rerender(
      <StoreProvider>
        <Consumer />
      </StoreProvider>
    );

    expect(screen.getByTestId("back-button")).toHaveTextContent("true");
  });
});
