// Import external dependencies
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Card from "@/components/general/card/card";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import ExpertiseItem from "@/components/about/expertiseItem";
import { loadExpertises } from "@/store/slices/expertiseSlice";

export default function AboutCard() {
  const abstract = useAppSelector((state) => state.personalInfo.abstract);
  const personalInfoLoaded = useAppSelector(
    (state) => state.personalInfo.loaded
  );
  const expertises = useAppSelector((state) => state.expertise.expertises);
  const expertiseLoaded = useAppSelector((state) => state.expertise.loaded);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!personalInfoLoaded) {
      dispatch(loadPersonalInfo());
    }

    if (!expertiseLoaded) {
      dispatch(loadExpertises());
    }
  }, []);

  return (
    <Card headline={t("main.about.title")}>
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: abstract }} />
        <h2 className=" pt-4">{t("main.about.subtitle")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
          {expertises.map(({ index, color, expertise, description, icon }) => (
            <ExpertiseItem
              index={index}
              key={index}
              color={color}
              expertise={expertise}
              description={description}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
