// Import external dependencies
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import Icon from "@/components/general/icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadEducations } from "@/store/slices/educationSlice";
import EducationItem from "@/components/resume/education/educationItem";

export default function EducationList() {
  const educations = useAppSelector((state) => state.education.educations);
  const loaded = useAppSelector((state) => state.education.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadEducations({language: language}));
    }
  });

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
