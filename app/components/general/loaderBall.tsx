interface LoaderBallObject {
  size: number;
  color: string;
  animationDelay: string;
  darkColor?: string;
}

export default function LoaderBall({
  size,
  color,
  darkColor,
  animationDelay,
}: LoaderBallObject) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="dot-loader"
        style={{ animationDelay: animationDelay }}
      >
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
