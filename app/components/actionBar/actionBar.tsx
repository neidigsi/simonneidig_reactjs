// Import internal dependencies
import LanguageSwitcher from "@/components/actionBar/languageSwitcher";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";
import LoginButton from "@/components/actionBar/loginButton";
import SmallButton from "@/components/general/buttons/smallButton";
import { useAppSelector } from "@/store/hooks";

// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { log } from "console";

/**
 * ActionBar Component
 *
 * This component renders a horizontal action bar containing interactive controls for user actions.
 * It displays a language switcher, dark mode toggle, and login/logout button.
 * The action bar is only visible on small screens (hidden on medium screens and larger via `md:hidden`).
 *
 * Features:
 * - Language switcher for changing the application language.
 * - Dark mode toggle for switching between light and dark themes.
 * - Login/logout button that adapts based on the user's authentication state.
 * - Responsive design that hides on larger screens.
 *
 * Usage:
 * - Place this component in the header or navigation area of your layout.
 * - Ideal for mobile or tablet layouts.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered ActionBar component with language, theme, and login controls.
 */
export default function ActionBar() {
    const { t } = useTranslation();
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate("/profile");
    };

    return (
        <>
            <LanguageSwitcher />
            <DarkModeToggl />
            {loggedIn && (
                <SmallButton
                    id="sm-btn-settings"
                    title={t("header.actionbar.settings")}
                    icon={"Cog6ToothIcon"}
                    onClick={handleSettingsClick}
                />)}
            <LoginButton />
        </>
    );
}
