import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import PersonalInfoItem from "@/components/sidebar/personalInfo/personalInfoItem";

export default function PersonalInfo() {
  return (
    <div className="flex bg-light-grey justify-center mt-6 mx-10 rounded-xl">
      <div className="m-5 w-full">
        <PersonalInfoItem
          label="Email"
          value="mail@simonneidig.de"
          icon={<EnvelopeIcon />}
        />
        <div className="bg-white h-[1px] mx-10" />
        <PersonalInfoItem
          label="Location"
          value="Germany"
          icon={<MapPinIcon />}
        />
        <div className="bg-white h-[1px] mx-10" />
        <PersonalInfoItem
          label="Company"
          value="SCHUMANN"
          icon={<ChartBarSquareIcon />}
        />
      </div>
    </div>
  );
}
