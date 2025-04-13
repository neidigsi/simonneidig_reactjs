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

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();

  const handleChange = (lang: string) => {
    dispatch(changeLanguage(lang));
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
              title={lang.label}
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
