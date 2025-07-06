interface LoaderBallObject {
  size: number;
  color: string;
  animationDelay: string;
  darkColor?: string;
}

/**
 * LoaderBall Component
 *
 * Renders a single animated loader ball with customizable size, color, and animation delay.
 * Optionally supports a different color for dark mode.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {number} size - The size of the loader ball.
 * @param {string} color - The color of the loader ball.
 * @param {string} animationDelay - The animation delay for the loader ball.
 * @param {string} [darkColor] - The color of the loader ball in dark mode.
 *
 * @returns {JSX.Element} The rendered loader ball component.
 */
export default function LoaderBall({
  size,
  color,
  darkColor,
  animationDelay,
}: Readonly<LoaderBallObject>) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="dot-loader" style={{ animationDelay: animationDelay }}>
        <div
          className={
            "w-" +
            size +
            " h-" +
            size +
            " bg-" +
            color +
            " rounded-full" +
            (darkColor != undefined ? " dark:bg-" + darkColor : "")
          }
        ></div>
      </div>
    </div>
  );
}
