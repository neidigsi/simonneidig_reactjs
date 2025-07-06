// Import internal dependencies
import Icon from "@/components/general/icon";
import {
  initializeDarkMode,
  toggleDarkMode
} from "@/store/slices/settingsSlice";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

/**
 * DarkModeToggl Component
 *
 * This component provides a button to toggle between light and dark mode for the application UI.
 * It displays a sun icon when dark mode is active and a moon icon when light mode is active.
 * On initial mount, it initializes the dark mode state from the Redux store, ensuring the theme
 * matches the user's previous preference or system setting. The button uses Tailwind CSS classes
 * for styling and adapts its background color based on the current theme.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none - This component does not accept any props.
 *
 * @returns {JSX.Element} A button that toggles dark mode. The button displays a sun or moon icon depending on the current theme. On mount, it initializes the dark mode state from the store.
 */
export default function DarkModeToggl() {
  const isDarkModeEnabled = useAppSelector((state) => state.settings.isDarkModeEnabled);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDarkMode())
  }, []);

  return (
    <button className="btn bg-white dark:bg-dark-mode-background" onClick={() => dispatch(toggleDarkMode())}>
      <div className="size-5">
        <Icon icon={isDarkModeEnabled ? "SunIcon" : "MoonIcon"} />
      </div>
    </button>
  );
}
