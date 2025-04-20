import LoaderBall from "@/components/general/loader/loaderBall";

interface LoaderObject {
  size: number;
  color: string;
  darkColor?: string;
}

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
