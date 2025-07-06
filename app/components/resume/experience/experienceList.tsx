// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import Icon from "@/components/general/icon";
import { useAppSelector } from "@/store/hooks";
import ExperienceItem from "@/components/resume/experience/experienceItem";

/**
 * ExperienceList Component
 *
 * Displays a list of work experience entries using the ExperienceItem component.
 * Shows a section headline and an icon.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none
 *
 * @returns {JSX.Element} The rendered experience list component.
 */
export default function ExperienceList() {
  const experiences = useAppSelector((state) => state.experience.experiences);

  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1">
      <div className="pt-4">
        <div className="flex items-center">
          <div className="size-7">
            <Icon icon="BriefcaseIcon" />
          </div>
          <h2 className="pl-2">{t("main.resume.experience")}</h2>
        </div>
        {experiences.map((e, index) => (
          <ExperienceItem index={index} key={e.id} experience={e} />
        ))}
      </div>
    </div>
  );
}
