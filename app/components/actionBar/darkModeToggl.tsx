// Import internal dependencies
import Icon from "@/components/general/icon";
import {
  initializeDarkMode,
  toggleDarkMode
} from "@/store/slices/settingsSlice";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

export default function DarkModeToggl() {
  const isDarkModeEnabled = useAppSelector((state) => state.settings.isDarkModeEnabled);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeDarkMode())
  }, []);

  return (
    <button className="btn bg-white dark:bg-dark-grey" onClick={() => dispatch(toggleDarkMode())}>
      <div className="size-5">
        <Icon icon={isDarkModeEnabled ? "SunIcon" : "MoonIcon"} />
      </div>
    </button>
  );
}
