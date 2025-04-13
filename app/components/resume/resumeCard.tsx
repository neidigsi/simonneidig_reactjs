// Import external dependencies
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import Card from "@/components/general/card";
import EducationList from "./education/educationList";
import ExperienceList from "./experience/experienceList";

export default function ResumeCard() {
  const { t } = useTranslation();

  return (
    <Card headline={t("main.resume.title")}>
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
