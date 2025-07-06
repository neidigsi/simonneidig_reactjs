// Import external dependencies
import { useState } from "react";

// Import internal dependencies
import Icon from "@/components/general/icon";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changeLanguage } from "@/store/slices/settingsSlice";

const languages = [
  { code: "en", flag: "🇬🇧" },
  { code: "de", flag: "🇩🇪" },
  { code: "fr", flag: "🇫🇷" },
];

/**
 * LanguageSwitcher Component
 *
 * This component provides a button group for switching the application's language.
 * When the main button is clicked, a list of available languages (represented by flags) is shown,
 * excluding the currently active language. Selecting a language updates the Redux store,
 * triggers a language change event, and closes the selection menu.
 * The component uses Tailwind CSS for styling and adapts to dark mode.
 * It is intended for use in the application's action bar or header.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none - This component does not accept any props.
 *
 * @returns {JSX.Element} A language switcher button group that allows the user to change the application's language. 
 * The currently active language is hidden from the selection. When the main button is clicked, a list of available languages (with flags) is shown, 
 * and selecting a language updates the Redux store and triggers a language change event.
 */
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();

  const handleChange = (lang: string) => {
    dispatch(changeLanguage(lang));
    dispatch({ type: "i18n/changeLanguage" });
    setOpen(false);
  };

  return (
    <div className="relative flex items-center justify-end space-x-2">
      {open &&
        [...languages]
          .reverse()
          .filter((lang) => lang.code !== language)
          .map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className="btn bg-white dark:bg-dark-mode-background mr-2 transition"
              title={lang.code}
            >
              <div className="size-5">{lang.flag}</div>
            </button>
          ))}
      <button
        className={`btn bg-white dark:bg-dark-mode-background mr-2 ${
          open ? " active" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="size-5">
          <Icon icon="FlagIcon" />
        </div>
      </button>
    </div>
  );
}
