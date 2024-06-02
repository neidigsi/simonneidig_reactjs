import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Badge from "../general/badge";
import PersonalInfo from "./personalInfo/personalInfo";
import SocialMedia from "./socialMedia/socialMedia";

export default function Sidebar() {
  return (
    <div className="grid col-span-1 h-screen items-end">
      <div className="mb-6">
        <div className="bg-primary">Sidebar</div>
        <div className="bg-white grid justify-center rounded-b-3xl">
          <h2 className="text-center mt-6">Simon Neidig</h2>
          <div className="grid justify-center my-4 text-base">
            <Badge
              text="Senior Consultant"
              additionalClasses="bg-light-grey font-bold"
            />
          </div>
          <SocialMedia />
          <PersonalInfo />
          <div className="grid justify-center my-10">
            <button className="btn btn-active flex">
              <ArrowDownTrayIcon className="size-6 mr-2" /> Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
