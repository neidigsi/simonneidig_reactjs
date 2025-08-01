// Import external dependencies
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Card from "@/components/general/card/card";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import ExpertiseItem from "@/components/about/expertiseItem";
import { loadExpertises } from "@/store/slices/expertiseSlice";
import "@/assets/css/main.css";
import "@/i18n";

/**
 * About Page Component
 *
 * This component displays the "About" page, including a personal abstract and a list of expertises.
 * It loads personal information and expertise data from the Redux store, triggering asynchronous fetches if needed.
 * The abstract is rendered as HTML, and the expertises are shown in a responsive grid using the ExpertiseItem component.
 * The page title is set dynamically based on the current language.
 * Tailwind CSS is used for layout and styling.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered About page.
 */
export default function About() {
  const abstract = useAppSelector((state) => state.personalDetails.abstract);
  const personalInfoLoaded = useAppSelector(
    (state) => state.personalInfo.loaded
  );
  const expertises = useAppSelector((state) => state.expertise.expertises);
  const expertiseLoaded = useAppSelector((state) => state.expertise.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = t("main.about.title") + " | Simon Neidig";

    if (!personalInfoLoaded) {
      dispatch(loadPersonalInfo({ language: language }));
    }

    if (!expertiseLoaded) {
      dispatch(loadExpertises({ language: language }));
    }
  });

  return (
    <Card
      headline={t("main.about.title")}
      loaded={expertiseLoaded && personalInfoLoaded}
    >
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: abstract }} />
        <h2 className=" pt-4">{t("main.about.subtitle")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          {expertises.map(({ id, color, title, description, icon }) => (
            <ExpertiseItem
              index={id}
              key={id}
              color={color}
              expertise={title}
              description={description}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
