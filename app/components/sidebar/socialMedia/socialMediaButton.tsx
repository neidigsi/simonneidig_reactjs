// Import external dependencies
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

interface SocialMediaButtonObject {
  id: string;
  path: string;
  color: string;
  url: string;
}

/**
 * SocialMediaButton Component
 *
 * Renders a social media icon button that opens the given URL in a new tab.
 * Highlights the icon on hover or when dark mode is enabled.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {string} id - The unique identifier for the button.
 * @param {string} path - The SVG path for the icon.
 * @param {string} color - The color for the icon.
 * @param {string} url - The URL to open when the button is clicked.
 *
 * @returns {JSX.Element} The rendered social media button component.
 */
export default function SocialMediaButton({
  id,
  path,
  color,
  url,
}: Readonly<SocialMediaButtonObject>) {
  // This variable is true if the button is currently highlighted
  const [active, setActive] = useState(false);
  const isDarkModeEnabled = useAppSelector((state) => state.settings.isDarkModeEnabled);


  /**
   * This method opens a given link in a new tab.
   *
   * @param {string} url The internet address, which should be opened.
   */
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <button
      id={`social-media-button-${id}`}
      type="button"
      aria-label={`Open ${id} in a new tab`}
      className="btn bg-dark-grey/20"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => openInNewTab(url)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={active || isDarkModeEnabled ? "#fff" : "currentColor"}
        style={{ color: color }}
        viewBox="0 0 24 24"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
