// Import external dependencies
import type { FC } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

/**
 * Icon Component
 *
 * Dynamically renders a HeroIcon from the @heroicons/react library based on the provided icon name.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {string} icon - The name of the icon to render.
 * @param {string} [className] - Optional additional CSS classes for the icon.
 *
 * @returns {JSX.Element} The rendered icon component.
 */
const Icon: FC<{ icon: string; className?: string }> = ({
  icon,
  className = "",
}) => {
  const { ...icons } = HeroIcons;
  // @ts-ignore
  const TheIcon: JSX.Element = icons[icon];

  if (!TheIcon) {
    console.error(`Icon "${icon}" not found. Using fallback icon.`);
    return (
      <HeroIcons.QuestionMarkCircleIcon className={className} />
    );
  }

  return <TheIcon className={className} />;
};

export default Icon;
