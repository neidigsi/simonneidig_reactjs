// Import external dependencies
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// Import internal dependencies
import Badge from "@/components/general/badge";
import PersonalInfo from "@/components/sidebar/personalInfo/personalInfo";
import SocialMedia from "@/components/sidebar/socialMedia/socialMedia";
import ProfilePicture from "@/components/sidebar/profilePicture";
import Button from "@/components/general/buttons/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalDetails } from "@/store/slices/personalDetailsSlice";

/**
 * Sidebar Component
 *
 * Displays the sidebar with profile picture, name, position, social media links, personal info, and a contact button.
 * Loads personal details from the store if not already loaded.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
export default function Sidebar() {
  const name = useAppSelector((state) => state.personalDetails.name);
  const position = useAppSelector((state) => state.personalDetails.position);
  const loaded = useAppSelector((state) => state.personalDetails.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadPersonalDetails({ language: language }));
    }
  });

  return (
    <div className="grid col-span-1 h-screen items-end w-full">
      <div className="md:mb-4 animate-glass-rise">
        <ProfilePicture />
        <div className="glass glass-subtle dark:text-white justify-center rounded-[28px] -mt-24 pt-24">
          <h2 className="relative z-[1] text-center pt-4">{name}</h2>
          <div className="relative z-[1] grid justify-center my-2 text-base">
            <Badge
              text={position}
              additionalClasses="glass-badge font-bold"
            />
          </div>
          <div className="relative z-[1]">
            <SocialMedia />
            <PersonalInfo />
            <div className="grid justify-center pb-4 md:pb-6">
              <Button
                text={t("sidebar.button")}
                icon="EnvelopeIcon"
                onClick={() => navigate("/contact")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
