// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useEffect } from "react";

// Import internal dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Card from "@/components/general/card/card";
import "@/assets/css/main.css";
import "@/i18n";
import TextInput from "@/components/general/input/textInput";
import Button from "@/components/general/buttons/button";
import TextButton from "@/components/general/buttons/textButton";
import {
  setEmail,
  setPassword
} from "@/store/slices/userSlice";

/**
 * Login Page Component
 *
 * This component renders the login page, including input fields for username and password,
 * as well as buttons for submitting the login form, registering a new account, and recovering a forgotten password.
 *
 * Features:
 * - Displays a localized login form with username and password fields.
 * - Provides a "Forgot Password" link and a "Register" button for additional actions.
 * - Uses Tailwind CSS for layout and styling.
 * - Integrates with i18n for translations.
 *
 * Usage:
 * - This component is used for the `/login` route.
 * - It is wrapped in a `Card` component for consistent styling.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Login page.
 */
export default function Login() {
  const email = useAppSelector((state) => state.user.user.email);
  const password = useAppSelector((state) => state.user.user.password);
  const loaded = useAppSelector((state) => state.user.loaded);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = t("login.title") + " | Simon Neidig";
  });

  return (
    <Card headline={t("login.title")} footer={false} className="max-w-sm">
      <div className="mb-4">{t("login.description")}</div>
      <TextInput
        id="input-email"
        label={t("login.email")}
        value={email}
        onChange={(value: string) => dispatch(setEmail(value))}
      />
      <TextInput
        id="input-password"
        label={t("login.password")}
        type="password"
        value={password}
        onChange={(value: string) => dispatch(setPassword(value))}
      />
      <div className="grid justify-end">
        <TextButton
          id="txt-btn-forgot-password"
          text={t("login.forgot-password")}
          className="mt-2 text-dark-grey"
          onClick={() => {}}
        />
      </div>
      <div className="grid justify-center mt-4">
        <Button
          id="btn-login-submit"
          text={t("login.submit")}
          icon="ArrowRightOnRectangleIcon"
          className="mt-4"
          inverted={true}
          onClick={() => {}}
        />
      </div>
      <div className="grid justify-center mt-4">
        <Button
          id="btn-login-register"
          text={t("login.register")}
          icon="UserPlusIcon"
          className="text-dark-grey"
          onClick={() => navigate("/register")}
        />
      </div>
    </Card>
  );
}
