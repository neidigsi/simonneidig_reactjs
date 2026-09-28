// Import external dependencies
import { render, screen, act } from "@testing-library/react";

// Import internal dependencies
import Notification from "@/components/general/notification/notification";

describe("Notification Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Test to check if the notification renders header and description
   * with default props when visible.
   */
  it("renders header and description when visible", () => {
    render(
      <Notification
        header="Hello"
        description="World"
        isVisible={true}
        autoClose={false}
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
    expect(document.body.querySelector("#notification")).toBeInTheDocument();
  });

  /**
   * Test to check if nothing renders when not visible.
   */
  it("renders nothing when not visible", () => {
    render(
      <Notification
        header="Hello"
        description="World"
        isVisible={false}
        autoClose={false}
      />
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
    expect(document.body.querySelector("#notification")).not.toBeInTheDocument();
  });

  /**
   * Test to check if a custom id is applied.
   */
  it("uses custom id when provided", () => {
    render(
      <Notification
        id="custom-notification"
        header="Hello"
        description="World"
        isVisible={true}
        autoClose={false}
      />
    );

    expect(
      document.body.querySelector("#custom-notification")
    ).toBeInTheDocument();
  });

  /**
   * Test to check border color classes per notification type.
   */
  it.each([
    ["success", "border-l-green-500"],
    ["error", "border-l-red-500"],
    ["info", "border-l-blue-500"],
  ] as const)(
    "applies correct border color for type %s",
    (type, expectedClass) => {
      render(
        <Notification
          header="Hello"
          description="World"
          type={type}
          isVisible={true}
          autoClose={false}
        />
      );

      expect(document.body.querySelector("#notification")).toHaveClass(
        expectedClass
      );
    }
  );

  /**
   * Test to check if the notification auto-closes after the delay.
   */
  it("auto-closes after the given delay", () => {
    render(
      <Notification
        header="Hello"
        description="World"
        isVisible={true}
        autoClose={true}
        autoCloseDelay={3000}
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  /**
   * Test to check if the notification stays visible when autoClose is false.
   */
  it("stays visible when autoClose is false", () => {
    render(
      <Notification
        header="Hello"
        description="World"
        isVisible={true}
        autoClose={false}
      />
    );

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  /**
   * Test to check if visibility updates when isVisible prop changes.
   */
  it("updates visibility when isVisible prop changes", () => {
    const { rerender } = render(
      <Notification
        header="Hello"
        description="World"
        isVisible={false}
        autoClose={false}
      />
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();

    rerender(
      <Notification
        header="Hello"
        description="World"
        isVisible={true}
        autoClose={false}
      />
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
