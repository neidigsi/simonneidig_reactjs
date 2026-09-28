// Import external dependencies
import { render } from "@testing-library/react";

// Import internal dependencies
import LoaderBall from "@/components/general/loader/loaderBall";

describe("LoaderBall Component", () => {
  /**
   * Test to check if the ball renders with size-derived dimensions.
   */
  it("renders with size-derived width and height", () => {
    const { container } = render(
      <LoaderBall size={4} color="red" animationDelay="0.1s" />
    );

    const ball = container.querySelector(
      ".dot-loader > div"
    ) as HTMLElement;
    expect(ball).toBeInTheDocument();
    expect(ball.style.width).toBe("1rem");
    expect(ball.style.height).toBe("1rem");
  });

  /**
   * Test to check if color and animation delay are applied.
   */
  it("applies color and animation delay", () => {
    const { container } = render(
      <LoaderBall size={5} color="blue" animationDelay="0.2s" />
    );

    const wrapper = container.querySelector(".dot-loader") as HTMLElement;
    expect(wrapper.style.animationDelay).toBe("0.2s");

    const ball = container.querySelector(
      ".dot-loader > div"
    ) as HTMLElement;
    expect(ball.style.backgroundColor).toBe("blue");
    expect(ball.style.borderRadius).toBe("50%");
  });

  /**
   * Test to check fractional size calculation.
   */
  it("calculates fractional sizes correctly", () => {
    const { container } = render(
      <LoaderBall size={3} color="green" animationDelay="0s" />
    );

    const ball = container.querySelector(
      ".dot-loader > div"
    ) as HTMLElement;
    expect(ball.style.width).toBe("0.75rem");
    expect(ball.style.height).toBe("0.75rem");
  });

  /**
   * Test to check if darkColor prop does not break rendering.
   */
  it("renders without errors when darkColor is provided", () => {
    const { container } = render(
      <LoaderBall
        size={4}
        color="red"
        darkColor="white"
        animationDelay="0s"
      />
    );

    expect(
      container.querySelector(".dot-loader > div")
    ).toBeInTheDocument();
  });
});
