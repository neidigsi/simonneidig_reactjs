// Import internal dependencies
import Icon from "@/components/general/icon";
import { login, logout } from "@/store/slices/userSlice";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import SmallButton from "../general/buttons/smallButton";

/**
 * Login Button Component
 *
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none - This component does not accept any props.
 *
 * @returns {JSX.Element}
 */
export default function LoginButton() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

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
          ? "ArrowRightEndOnRectangleIcon"
          : "ArrowStartEndOnRectangleIcon"
      }
      onClick={() => dispatch(login())}
    />
  );
}
