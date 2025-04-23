// Import external dependencies
import { useNavigate } from "react-router";

/**
 * FooterItem Component
 *
 * This component renders a button that optionally navigates to a specified path when clicked.
 * If a path is provided, the button becomes clickable and changes its text color on hover.
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {string} text - The text to display on the button.
 * @param {string} [path] - The optional path to navigate to when the button is clicked.
 *
 * @returns {JSX.Element} The rendered FooterItem component.
 */
export default function FooterItem({
  text,
  path,
}: Readonly<{ text: string; path?: string }>) {
  const navigate = useNavigate();

  return (
    <button
      className={`text-black dark:text-white ${
        path == undefined ? "" : "hover:cursor-pointer hover:text-primary"
      }`}
      onClick={() => {
        if (path) {
          navigate(path);
        }
      }}
    >
      {text}
    </button>
  );
}
