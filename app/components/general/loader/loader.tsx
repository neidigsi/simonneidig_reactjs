import LoaderBall from "@/components/general/loader/loaderBall";

interface LoaderObject {
  size: number;
  color: string;
  darkColor?: string;
}

/**
 * Loader Component
 *
 * Displays a loading animation consisting of three animated balls.
 * Supports custom size and color, including a dark mode color.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {number} size - The size of the loader balls.
 * @param {string} color - The color of the loader balls.
 * @param {string} [darkColor] - The color of the loader balls in dark mode.
 *
 * @returns {JSX.Element} The rendered loader component.
 */
export default function Loader({ size, color, darkColor }: Readonly<LoaderObject>) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <LoaderBall
        size={size}
        color={color}
        darkColor={darkColor}
        animationDelay="0s"
      />
      <LoaderBall
        size={size}
        color={color}
        darkColor={darkColor}
        animationDelay="0.1s"
      />
      <LoaderBall
        size={size}
        color={color}
        darkColor={darkColor}
        animationDelay="0.2s"
      />
    </div>
  );
}
