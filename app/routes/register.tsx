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
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setRepeatPassword,
  register
} from "@/store/slices/userSlice";

/**
 * Register Page Component
 *
 * This component renders the registration page, including input fields for user details
 * (e.g., first name, last name, email, password) and buttons for submitting the form or navigating to the login page.
 *
 * Features:
 * - Displays a localized registration form with fields for user details.
 * - Provides a "Already have an account?" link to navigate to the login page.
 * - Uses Tailwind CSS for layout and styling.
 * - Integrates with i18n for translations.
 *
 * Usage:
 * - This component is used for the `/register` route.
 * - It is wrapped in a `Card` component for consistent styling.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Register page.
 */
export default function Register() {
  const firstName = useAppSelector((state) => state.user.user.firstName);
  const lastName = useAppSelector((state) => state.user.user.lastName);
  const email = useAppSelector((state) => state.user.user.email);
  const error = useAppSelector((state) => state.user.error);
  const password = useAppSelector((state) => state.user.user.password);
  const repeatPassword = useAppSelector(
    (state) => state.user.user.repeatPassword
  );
  const loaded = useAppSelector((state) => state.user.loaded);
  const language = useAppSelector((state) => state.settings.language);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = t("register.title") + " | Simon Neidig";
  });

  // Navigate to home if already logged in
  useEffect(() => {
    if (loggedIn && loaded) {
      navigate("/");
    }
  }, [loggedIn, loaded, navigate]);

  const handleRegister = () => {
    dispatch(register({ language: language }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <Card headline={t("register.title")} footer={false} className="max-w-sm">
      <div className="mb-4">{t("register.description")}</div>
      {error.active && (
        <div className="mb-4 p-3 rounded text-sm bg-red-500/20 text-red-600">
          {
            error.code === "REGISTER_USER_ALREADY_EXISTS" ?
              t("register.user-already-exists")
              : error.code
          }
        </div>)
      }
      <div onKeyDown={handleKeyDown}>
        <TextInput
          id="input-first-name"
          label={t("register.first-name")}
          value={firstName}
          onChange={(value: string) => dispatch(setFirstName(value))}
        />
        <TextInput
          id="input-last-name"
          label={t("register.last-name")}
          value={lastName}
          onChange={(value: string) => dispatch(setLastName(value))}
        />
        <TextInput
          id="input-email"
          label={t("register.email")}
          value={email}
          errorMessage={
            !email.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$") &&
              email.length > 0
              ? t("register.email-invalid")
              : undefined
          }
          onChange={(value: string) => dispatch(setEmail(value))}
        />
        <TextInput
          id="input-password"
          label={t("register.password")}
          type="password"
          value={password}
          onChange={(value: string) => dispatch(setPassword(value))}
        />
        <TextInput
          id="input-confirm-password"
          label={t("register.confirm-password")}
          type="password"
          value={repeatPassword}
          errorMessage={
            password != repeatPassword
              ? t("register.password-mismatch")
              : undefined
          }
          onChange={(value: string) => dispatch(setRepeatPassword(value))}
        />
        <div className="grid justify-end">
          <TextButton
            id="txt-btn-already-have-account"
            text={t("register.already-have-account")}
            className="mt-2 text-dark-grey"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
      <div className="mt-4 w-full">
        <Button
          id="btn-login-submit"
          text={t("register.submit")}
          icon="UserPlusIcon"
          className="mt-4 w-full"
          loading={!loaded}
          disabled={
            !loaded ||
            firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            repeatPassword.length === 0 ||
            password !== repeatPassword
          }
          inverted={true}
          onClick={handleRegister}
        />
      </div>
    </Card>
  );
}
