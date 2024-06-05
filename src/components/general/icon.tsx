// Import external dependencies
import { FC } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

const Icon: FC<{ icon: string }> = (props) => {
  const { ...icons } = HeroIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon];

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon />
    </>
  );
};

export default Icon;
