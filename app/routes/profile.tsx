// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Import internal dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Card from "@/components/general/card/card";
import "@/assets/css/main.css";
import "@/i18n";
import TextInput from "@/components/general/input/textInput";
import Button from "@/components/general/buttons/button";
import Notification from "@/components/general/notification/notification";
import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setRepeatPassword,
  resetError,
  updateUserProfile,
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
  const [showNotification, setShowNotification] = useState(false);
  
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
  const jwt = useAppSelector((state) => state.user.jwt);
  const language = useAppSelector((state) => state.settings.language);

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

  // Show notification when update completes
  useEffect(() => {
    if (loaded && showNotification) {
      // Notification will auto-close after delay
      const timer = setTimeout(() => setShowNotification(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [loaded, showNotification]);

  const handleSave = () => {
    setShowNotification(true);
    dispatch(
      updateUserProfile({
        language: language,
        jwt: jwt,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password.length > 0 ? password : undefined,
      })
    );
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
    <Card headline={t("profile.title")} footer={false}>
      <div className="mb-4">{t("profile.description")}</div>
      <div onKeyDown={handleKeyDown}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
        </div>
        <TextInput
          id="input-email"
          label={t("profile.email")}
          value={email}
          errorMessage={
            !isEmailValid && email.length > 0 ? t("profile.email-invalid") : undefined
          }
          onChange={(value: string) => dispatch(setEmail(value))}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
      </div>
      <div className="mt-6">
        <Button
          id="btn-profile-save"
          text={t("profile.save")}
          icon="CheckIcon"
          className="mt-4 w-fit"
          loading={!loaded}
          disabled={isSaveDisabled}
          inverted={true}
          onClick={handleSave}
        />
      </div>
      <Notification
        id="profile-notification"
        header={
          error.active && error.code
            ? t("profile.update-failed")
            : t("profile.update-success")
        }
        description={
          error.active && error.code
            ? error.code
            : t("profile.update-success-description")
        }
        type={error.active && error.code ? "error" : "success"}
        autoClose={true}
        autoCloseDelay={3000}
        isVisible={showNotification && loaded}
      />
    </Card>
  );
}
