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
import { setEmail, setPassword, login } from "@/store/slices/userSlice";

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
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const error = useAppSelector((state) => state.user.error);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = t("login.title") + " | Simon Neidig";
  });

  // Navigiere zur Hauptseite wenn erfolgreich angemeldet
  useEffect(() => {
    if (loggedIn && loaded) {
      navigate("/");
    }
  }, [loggedIn, loaded, navigate]);

  const handleLogin = () => {
    dispatch(login({ language: language }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (email.length > 0 && password.length > 0 && loaded) {
        handleLogin();
      }
    }
  };

  return (
    <Card headline={t("login.title")} footer={false} className="max-w-sm">
      <div className="mb-4">{t("login.description")}</div>
      {error.active && (
        <div className="mb-4 p-3 rounded text-sm bg-red-500/20 text-red-600">
          {error.code === "LOGIN_BAD_CREDENTIALS" &&
            t("login.invalid-credentials")}
        </div>
      )}
      <div onKeyDown={handleKeyDown}>
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
      </div>
      <div className="grid justify-end">
        <TextButton
          id="txt-btn-forgot-password"
          text={t("login.forgot-password")}
          className="mt-2 text-dark-grey"
          onClick={() => {}}
        />
      </div>
      <div className="mt-4 w-full">
        <Button
          id="btn-login-submit"
          text={t("login.submit")}
          icon="ArrowRightOnRectangleIcon"
          loading={!loaded}
          disabled={!loaded || email.length === 0 || password.length === 0}
          className="mt-4 w-full"
          inverted={true}
          onClick={handleLogin}
        />
      </div>
      <div className="mt-4 w-full">
        <Button
          id="btn-login-register"
          text={t("login.register")}
          icon="UserPlusIcon"
          loading={false}
          className="text-dark-grey w-full"
          onClick={() => navigate("/register")}
        />
      </div>
    </Card>
  );
}
