// Import internal dependencies
import Icon from "@/components/general/icon";
import { useNavigate } from "react-router";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import { useAppDispatch } from "@/store/hooks";

interface NavigationItem {
  text: string;
  path: string;
  icon: string;
  active: boolean;
}

/**
 * NavigationItem Component
 *
 * Renders a single navigation item with an icon and label.
 * Highlights the item if active and navigates to the specified path on click.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {string} text - The label for the navigation item.
 * @param {string} path - The path to navigate to when clicked.
 * @param {string} icon - The icon name to display.
 * @param {boolean} active - Whether the navigation item is currently active.
 *
 * @returns {JSX.Element} The rendered navigation item component.
 */
export default function NavigationItem({
  text,
  path,
  icon,
  active,
}: Readonly<NavigationItem>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Handles the click event on the navigation item.
   * It disables the back button and navigates to the specified path.
   */
  const handleClick = () => {
    if (!active) {
      dispatch(setBackButtonEnabled(false));
      navigate(path);
    }
  };

  return (
    <button
      id={`navigation-item-${text}`}
      type="button"
      aria-label={text}
      className={active ? "nav-item nav-item-active active" : "nav-item"}
      onClick={handleClick}
    >
      <div className="grid justify-items-center gap-1">
        <div className="size-5">
          <Icon icon={icon} />
        </div>
        {text}
      </div>
    </button>
  );
}
