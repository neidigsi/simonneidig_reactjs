// Import external dependencies
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Import internal dependencies
import Card from "@/components/general/card/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadExperiences } from "@/store/slices/experienceSlice";
import { loadEducations } from "@/store/slices/educationSlice";
import EducationList from "@/components/resume/education/educationList";
import ExperienceList from "@/components/resume/experience/experienceList";
import "@/assets/css/main.css";

/**
 * Resume Page Component
 *
 * This component displays the resume page, showing both work experience and education in a responsive grid layout.
 * It loads experience and education data from the Redux store, triggering asynchronous fetches if the data is not yet loaded.
 * The page title is set dynamically based on the current language.
 * The ExperienceList and EducationList components are rendered side by side on large screens and stacked on small screens.
 * Tailwind CSS is used for layout and styling.
 * Integrates with Redux for state management and i18n for translations.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Resume page.
 */
export default function Resume() {
  const experiencesLoaded = useAppSelector((state) => state.experience.loaded);
  const educationLoaded = useAppSelector((state) => state.education.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!experiencesLoaded) {
      dispatch(loadExperiences({ language: language }));
    }
    if (!educationLoaded) {
      dispatch(loadEducations({ language: language }));
    }
    document.title = t("main.resume.title") + " | Simon Neidig";
  });

  return (
    <Card
      headline={t("main.resume.title")}
      loaded={experiencesLoaded && educationLoaded}
    >
      <div className="text-base grid grid-cols-1 lg:grid-cols-2  gap-4">
        <div className="col-span-1">
          <ExperienceList />
        </div>
        <div className="col-span-1">
          <EducationList />
        </div>
      </div>
    </Card>
  );
}
