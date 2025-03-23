// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import Icon from "@/components/general/icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadExperiences } from "@/store/slices/experienceSlice";
import ExperienceItem from "@/components/resume/experience/experienceItem";

export default function ExperienceList() {
  const experiences = useAppSelector((state) => state.experience.experiences);
  const loaded = useAppSelector((state) => state.experience.loaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadExperiences());
    }
  }, []);

  return (
    <div className="grid grid-cols-1">
      <div className="pt-4">
        <div className="flex items-center">
          <div className="size-7">
            <Icon icon="BriefcaseIcon" />
          </div>
          <h2 className="pl-2">Experience</h2>
        </div>
        {experiences.map((e) => (
          <ExperienceItem key={e.index} experience={e} />
        ))}
      </div>
    </div>
  );
}
