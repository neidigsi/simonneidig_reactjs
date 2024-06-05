import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Badge from "@/components/general/badge";
import PersonalInfo from "@/components/sidebar/personalInfo/personalInfo";
import SocialMedia from "@/components/sidebar/socialMedia/socialMedia";
import ProfilePicture from "./profilePicture";

export default function Sidebar() {
  return (
    <div className="grid col-span-1 h-screen items-end">
      <div className="mb-6">
        <ProfilePicture />
        <div className="bg-white justify-center rounded-b-3xl w-full">
          <h2 className="text-center pt-6">Simon Neidig</h2>
          <div className="grid justify-center my-4 text-base">
            <Badge
              text="Senior Consultant"
              additionalClasses="bg-light-grey font-bold"
            />
          </div>
          <SocialMedia />
          <PersonalInfo />
          <div className="grid justify-center py-10">
            <button className="btn btn-active flex">
              <ArrowDownTrayIcon className="size-6 mr-2" /> Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
