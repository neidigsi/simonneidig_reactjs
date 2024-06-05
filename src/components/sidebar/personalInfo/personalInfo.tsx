// Import internal dependencies
import PersonalInfoItem from "@/components/sidebar/personalInfo/personalInfoItem";
import { useAppSelector } from "@/store/hooks";

export default function PersonalInfo() {
  const information = useAppSelector((state) => state.personalInfo.information);

  return (
    <div className="flex bg-light-grey justify-center mt-6 mx-10 rounded-xl">
      <div className="m-5 w-full">
        {information != undefined &&
          information.map((info: any, index: number) => (
            <>
              <PersonalInfoItem
                label={info.label}
                value={info.value}
                icon={info.icon}
              />
              {index < information.length - 1 && (
                <div className="bg-white h-[1px] mx-10" />
              )}
            </>
          ))}
      </div>
    </div>
  );
}
