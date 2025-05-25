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
