"use client";
import { useState } from "react";

interface SocialMediaButtonObject {
  path: string;
  color: string;
  link: string;
}

export default function SocialMediaButton({
  path,
  color,
  link,
}: Readonly<SocialMediaButtonObject>) {
  // This variable is true if the button is currently highlighted
  const [active, setActive] = useState(false);


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
      className="btn-light-grey"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => openInNewTab(link)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={active ? "#fff" : "currentColor"}
        style={{ color: color }}
        viewBox="0 0 24 24"
      >
        <path d={path} />
      </svg>
    </button>
  );
}
