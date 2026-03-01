// Import internal dependencies
import SmallButton from "@/components/general/buttons/smallButton";
import { logout } from "@/store/slices/userSlice";
import { resetContactStatus } from "@/store/slices/contactSlice";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

/**
 * LoginButton Component
 *
 * This component renders a small button that allows the user to log in or log out.
 * The button's text and icon dynamically change based on the user's login state.
 *
 * Features:
 * - Displays "Login" or "Logout" text and corresponding icons based on the `loggedIn` state.
 * - Navigates to the login page when clicked.
 * - Uses Redux for state management and i18n for translations.
 *
 * Usage:
 * - Place this component in the action bar or header to provide login/logout functionality.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered LoginButton component.
 */
export default function LoginButton() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const language = useAppSelector((state) => state.settings.language);
  const jwt = useAppSelector((state) => state.user.jwt);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <SmallButton
      id="sm-btn-login"
      title={
        loggedIn
          ? t("header.actionbar.login.logout")
          : t("header.actionbar.login.login")
      }
      icon={
        loggedIn
          ? "ArrowRightStartOnRectangleIcon"
          : "ArrowRightEndOnRectangleIcon"
      }
      onClick={() => {
        if (!loggedIn) {
          navigate("/login");
        } else {
          dispatch(logout({ language, jwt }));
          dispatch(resetContactStatus());
        }
      }}
    />
  );
}
