// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import PersonalInfoItem from "@/components/sidebar/personalInfo/personalInfoItem";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";

export default function PersonalInfo() {
  const information = useAppSelector((state) => state.personalInfo.information);
  const loaded = useAppSelector((state) => state.personalInfo.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadPersonalInfo({ language: language }));
    }
  });

  return (
    <div className="flex bg-dark-grey/20 justify-center m-6 rounded-xl">
      <div className="m-5 w-full">
        {information.map(({ label, value, icon }: any, index: number) => (
          <div key={label}>
            <PersonalInfoItem label={label} value={value} icon={icon} />
            {index < information.length - 1 && (
              <div className="bg-white dark:bg-dark-mode-background h-[1px] mx-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
