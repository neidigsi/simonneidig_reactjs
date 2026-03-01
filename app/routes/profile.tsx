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
  resetError,
} from "@/store/slices/userSlice";

/**
 * Profile Page Component
 *
 * This component renders the profile edit page for logged-in users.
 * It allows users to view and modify their profile information including:
 * - First Name
 * - Last Name
 * - Email
 * - Password
 * - Confirm Password (if changing password)
 *
 * Features:
 * - Displays a localized profile edit form with all user attributes.
 * - Provides input fields with validation for email and password confirmation.
 * - Includes a "Save" button to submit changes and a "Cancel" button to return to the previous page.
 * - Shows error messages if any issues occur.
 * - Uses Tailwind CSS for layout and styling.
 * - Integrates with i18n for translations.
 * - Redirects to login if user is not authenticated.
 *
 * Usage:
 * - This component is used for the `/profile` route.
 * - It is wrapped in a `Card` component for consistent styling.
 * - Only accessible to authenticated users.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Profile edit page.
 */
export default function Profile() {
  const firstName = useAppSelector((state) => state.user.user.firstName);
  const lastName = useAppSelector((state) => state.user.user.lastName);
  const email = useAppSelector((state) => state.user.user.email);
  const password = useAppSelector((state) => state.user.user.password);
  const repeatPassword = useAppSelector(
    (state) => state.user.user.repeatPassword
  );
  const error = useAppSelector((state) => state.user.error);
  const loaded = useAppSelector((state) => state.user.loaded);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = t("profile.title") + " | Simon Neidig";
  }, [t]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loggedIn && loaded) {
      navigate("/login");
    }
  }, [loggedIn, loaded, navigate]);

  // Reset error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleSave = () => {
    // TODO: Implement profile update API call
    console.log("Saving profile:", {
      firstName,
      lastName,
      email,
      password: password.length > 0 ? "***" : "",
    });
  };

  const handleCancel = () => {
    dispatch(resetError());
    navigate(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        firstName.length > 0 &&
        lastName.length > 0 &&
        email.length > 0 &&
        loaded
      ) {
        handleSave();
      }
    }
  };

  // Validate email format
  const isEmailValid =
    email.length === 0 ||
    email.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

  // Validate password match (only if password is entered)
  const isPasswordMatch =
    password.length === 0 || password === repeatPassword;

  // Disable save button when validation fails
  const isSaveDisabled =
    !loaded ||
    firstName.length === 0 ||
    lastName.length === 0 ||
    email.length === 0 ||
    !isEmailValid ||
    !isPasswordMatch;

  return (
    <Card headline={t("profile.title")} footer={false} className="max-w-sm">
      <div className="mb-4">{t("profile.description")}</div>
      {error.active && (
        <div className="mb-4 p-3 rounded text-sm bg-red-500/20 text-red-600">
          {error.code}
        </div>
      )}
      <div onKeyDown={handleKeyDown}>
        <TextInput
          id="input-first-name"
          label={t("profile.first-name")}
          value={firstName}
          onChange={(value: string) => dispatch(setFirstName(value))}
        />
        <TextInput
          id="input-last-name"
          label={t("profile.last-name")}
          value={lastName}
          onChange={(value: string) => dispatch(setLastName(value))}
        />
        <TextInput
          id="input-email"
          label={t("profile.email")}
          value={email}
          errorMessage={
            !isEmailValid && email.length > 0 ? t("profile.email-invalid") : undefined
          }
          onChange={(value: string) => dispatch(setEmail(value))}
        />
        <TextInput
          id="input-password"
          label={t("profile.password")}
          type="password"
          value={password}
          onChange={(value: string) => dispatch(setPassword(value))}
        />
        <TextInput
          id="input-confirm-password"
          label={t("profile.confirm-password")}
          type="password"
          value={repeatPassword}
          errorMessage={
            !isPasswordMatch && password.length > 0
              ? t("profile.password-mismatch")
              : undefined
          }
          onChange={(value: string) => dispatch(setRepeatPassword(value))}
        />
      </div>
      <div className="mt-6 flex gap-3 w-full">
        <Button
          id="btn-profile-save"
          text={t("profile.save")}
          icon="CheckIcon"
          className="flex-1"
          loading={!loaded}
          disabled={isSaveDisabled}
          inverted={true}
          onClick={handleSave}
        />
        <Button
          id="btn-profile-cancel"
          text={t("profile.cancel")}
          icon="XMarkIcon"
          className="flex-1 text-dark-grey"
          loading={false}
          disabled={false}
          onClick={handleCancel}
        />
      </div>
    </Card>
  );
}
