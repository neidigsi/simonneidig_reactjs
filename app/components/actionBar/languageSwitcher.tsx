// Import internal dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { changeLanguage } from "@/store/slices/settingsSlice";
import SmallButton from "@/components/general/buttons/smallButton";


// Import external dependencies
import { useState } from "react";
import { useTranslation } from "react-i18next";


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

  const { t } = useTranslation();

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
            <SmallButton
              key={lang.code}
              id={"sm-btn-lang-" + lang.code}
              title={t("header.actionbar.language." + lang.code)}
              children={<div className="size-5">{lang.flag}</div>}
              onClick={() => handleChange(lang.code)}
            />
          ))}
    <SmallButton
        id="sm-btn-language-switcher-button"
        title={t("header.actionbar.language.title")}
        className={open ? " active" : ""}
        icon={"FlagIcon"}
        onClick={() => setOpen(!open)}/>    
      
    </div>
  );
}
