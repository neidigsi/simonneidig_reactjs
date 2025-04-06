// Import internal dependencies
import PersonalInfoItem from "@/components/sidebar/personalInfo/personalInfoItem";

// Import external dependencies
import { useAppSelector } from "@/store/hooks";

export default function PersonalInfo() {
  const information = useAppSelector((state) => state.personalInfo.information);

  return (
    <div className="flex bg-light-grey justify-center m-6 rounded-xl">
      <div className="m-5 w-full">
        {information.map(({ label, value, icon }: any, index: number) => (
          <div key={label}>
            <PersonalInfoItem label={label} value={value} icon={icon} />
            {index < information.length - 1 && (
              <div className="bg-white h-[1px] mx-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
