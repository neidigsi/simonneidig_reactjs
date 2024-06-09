// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Card from "@/components/general/card";
import { useEffect } from "react";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import ExpertiseItem from "./expertiseItem";
import { loadExpertises } from "@/store/slices/expertiseSlice";

export default function AboutCard() {
  const abstract = useAppSelector((state) => state.personalInfo.abstract);
  const personalInfoLoaded = useAppSelector(
    (state) => state.personalInfo.loaded
  );
  const expertises = useAppSelector((state) => state.expertise.expertises);
  const expertiseLoaded = useAppSelector((state) => state.expertise.loaded);

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
    <Card headline="About">
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: abstract }} />
        <h2>What I do!</h2>
        <div className="grid grid-cols-2 gap-4">
          {expertises.map(({ index, expertise, description, icon }) => (
            <ExpertiseItem
              key={index}
              index={index}
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
