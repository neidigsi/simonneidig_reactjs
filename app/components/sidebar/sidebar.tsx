// Import external dependencies
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import Badge from "@/components/general/badge";
import PersonalInfo from "@/components/sidebar/personalInfo/personalInfo";
import SocialMedia from "@/components/sidebar/socialMedia/socialMedia";
import ProfilePicture from "@/components/sidebar/profilePicture";
import { useAppSelector } from "@/store/hooks";
import Button from "@/components/general/button/button";

export default function Sidebar() {
  const name = useAppSelector((state) => state.personalInfo.name);
  const position = useAppSelector((state) => state.personalInfo.position);

  const { t } = useTranslation();

  return (
    <div className="grid col-span-1 h-screen items-end w-full">
      <div className="mb-4 drop-shadow-xl">
        <ProfilePicture />
        <div className="bg-white dark:bg-dark-mode-background dark:text-white justify-center rounded-b-2xl">
          <h2 className="text-center pt-4">{name}</h2>
          <div className="grid justify-center my-2 text-base">
            <Badge
              text={position}
              additionalClasses="bg-dark-grey/20 font-bold"
            />
          </div>
          <SocialMedia />
          <PersonalInfo />
          <div className="grid justify-center pb-6">
            <Button text={t("sidebar.cv-button")} icon="ArrowDownTrayIcon" onClick={() => {}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
