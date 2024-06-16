"use client";

// Import external dependencies
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Import internal dependencies
import Badge from "@/components/general/badge";
import PersonalInfo from "@/components/sidebar/personalInfo/personalInfo";
import SocialMedia from "@/components/sidebar/socialMedia/socialMedia";
import ProfilePicture from "@/components/sidebar/profilePicture";
import { useAppSelector } from "@/store/hooks";

export default function Sidebar() {
  const name = useAppSelector((state) => state.personalInfo.name);
  const position = useAppSelector((state) => state.personalInfo.position);

  return (
    <div className="grid col-span-1 h-screen items-end w-full">
      <div className="mb-4 drop-shadow-xl">
        <ProfilePicture />
        <div className="bg-white justify-center rounded-b-2xl">
          <h2 className="text-center pt-4">{name}</h2>
          <div className="grid justify-center my-2 text-base">
            <Badge
              text={position}
              additionalClasses="bg-light-grey font-bold"
            />
          </div>
          <SocialMedia />
          <PersonalInfo />
          <div className="grid justify-center pb-6">
            <button className="btn btn-active flex">
              <ArrowDownTrayIcon className="size-6 mr-2" /> Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
