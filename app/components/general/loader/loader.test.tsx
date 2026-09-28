// Import external dependencies
import { render } from "@testing-library/react";

// Import internal dependencies
import Loader from "@/components/general/loader/loader";

// Mock LoaderBall to observe props passed by Loader
jest.mock("@/components/general/loader/loaderBall", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div
        data-testid="mock-loader-ball"
        data-size={props.size}
        data-color={props.color}
        data-dark-color={props.darkColor ?? ""}
        data-animation-delay={props.animationDelay}
      />
    ),
  };
});

describe("Loader Component", () => {
  /**
   * Test to check if three loader balls are rendered.
   */
  it("renders three loader balls", () => {
    const { getAllByTestId } = render(<Loader size={5} color="secondary" />);

    expect(getAllByTestId("mock-loader-ball")).toHaveLength(3);
  });

  /**
   * Test to check if size, color and darkColor are forwarded.
   */
  it("forwards size, color and darkColor to all balls", () => {
    const { getAllByTestId } = render(
      <Loader size={5} color="secondary" darkColor="white" />
    );

    getAllByTestId("mock-loader-ball").forEach((ball) => {
      expect(ball).toHaveAttribute("data-size", "5");
      expect(ball).toHaveAttribute("data-color", "secondary");
      expect(ball).toHaveAttribute("data-dark-color", "white");
    });
  });

  /**
   * Test to check if staggered animation delays are applied.
   */
  it("applies staggered animation delays", () => {
    const { getAllByTestId } = render(<Loader size={5} color="secondary" />);

    const balls = getAllByTestId("mock-loader-ball");
    expect(balls[0]).toHaveAttribute("data-animation-delay", "0s");
    expect(balls[1]).toHaveAttribute("data-animation-delay", "0.1s");
    expect(balls[2]).toHaveAttribute("data-animation-delay", "0.2s");
  });

  /**
   * Test to check if darkColor is optional.
   */
  it("renders without darkColor", () => {
    const { getAllByTestId } = render(<Loader size={3} color="red" />);

    getAllByTestId("mock-loader-ball").forEach((ball) => {
      expect(ball).toHaveAttribute("data-dark-color", "");
    });
  });
});
