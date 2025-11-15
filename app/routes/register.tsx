// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useEffect } from "react";

// Import internal dependencies
import Card from "@/components/general/card/card";
import "@/assets/css/main.css";
import "@/i18n";
import TextInput from "@/components/general/input/textInput";
import Button from "@/components/general/buttons/button";
import TextButton from "@/components/general/buttons/textButton";

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
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = t("register.title") + " | Simon Neidig";
  });

  return (
    <Card headline={t("register.title")} footer={false} className="max-w-sm">
      <div className="mb-4">{t("register.description")}</div>
      <TextInput
        id="input-first-name"
        label={t("register.first-name")}
        value=""
        onChange={() => {}}
      />
      <TextInput
        id="input-last-name"
        label={t("register.last-name")}
        value=""
        onChange={() => {}}
      />
      <TextInput
        id="input-email"
        label={t("register.email")}
        value=""
        onChange={() => {}}
      />
      <TextInput
        id="input-password"
        label={t("register.password")}
        type="password"
        value=""
        onChange={() => {}}
      />
      <TextInput
        id="input-confirm-password"
        label={t("register.confirm-password")}
        type="password"
        value=""
        onChange={() => {}}
      />
      <div className="grid justify-end">
        <TextButton
          id="txt-btn-already-have-account"
          text={t("register.already-have-account")}
          className="mt-2 text-dark-grey"
          onClick={() => navigate("/login")}
        />
      </div>
      <div className="grid justify-center mt-4">
        <Button
          id="btn-login-submit"
          text={t("register.submit")}
          icon="UserPlusIcon"
          className="mt-4"
          inverted={true}
          onClick={() => {}}
        />
      </div>
    </Card>
  );
}
