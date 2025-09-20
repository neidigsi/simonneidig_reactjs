// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import Icon from "@/components/general/icon";
import { useAppSelector } from "@/store/hooks";
import EducationItem from "@/components/resume/education/educationItem";

/**
 * EducationList Component
 *
 * Displays a list of education entries using the EducationItem component.
 * Shows a section headline and an icon.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none
 *
 * @returns {JSX.Element} The rendered education list component.
 */
export default function EducationList() {
  const educations = useAppSelector((state) => state.education.educations);

  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1">
      <div className="pt-4">
        <div className="flex items-center">
          <div className="size-7">
            <Icon icon="AcademicCapIcon" />
          </div>
          <h2 className="pl-2">{t("main.resume.education")}</h2>
        </div>
        {educations.map((e, index) => (
          <EducationItem key={e.id} index={index} education={e} />
        ))}
      </div>
    </div>
  );
}
