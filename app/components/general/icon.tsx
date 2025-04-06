// Import external dependencies
import type { FC } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

const Icon: FC<{ icon: string; className?: string }> = ({
  icon,
  className = "",
}) => {
  const { ...icons } = HeroIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className={className} />
    </>
  );
};

export default Icon;
