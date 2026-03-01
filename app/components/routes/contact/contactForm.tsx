// Import internal dependencies
import TextInput from "@/components/general/input/textInput";
import {
  setName,
  setEmail,
  setMessage,
  sendMessage,
  resetContact,
} from "@/store/slices/contactSlice";
import Button from "@/components/general/buttons/button";
import TextareaInput from "@/components/general/input/textareaInput";
import Notification from "@/components/general/notification/notification";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { JSX, useEffect, useState } from "react";

/**
 * ContactForm Component
 *
 * This component renders a contact form with fields for name, email, and message.
 * It uses Redux state for form values and dispatches actions to update them.
 * The form is localized using react-i18next.
 *
 * Features:
 * - Controlled inputs for name, email, and message.
 * - Submit button is disabled until all fields are filled.
 * - On submit, dispatches sendMessage with the current language.
 *
 * Usage:
 * <ContactForm />
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none - This component does not accept any props. All state is managed via Redux.
 *
 * @returns {JSX.Element} Renders a localized contact form with fields for name, email, and message.
 * The form uses controlled inputs, disables the submit button until all fields are filled,
 * and dispatches a sendMessage action on submit. If sending fails, the user is redirected to an error page.
 */
export default function ContactForm(): JSX.Element {
  const [showNotification, setShowNotification] = useState(false);

  const name = useAppSelector((state) => state.contact.name);
  const email = useAppSelector((state) => state.contact.email);
  const message = useAppSelector((state) => state.contact.message);
  const language = useAppSelector((state) => state.settings.language);
  const loaded = useAppSelector((state) => state.contact.loaded);
  const successful = useAppSelector((state) => state.contact.sentSuccessfully);
  const error = useAppSelector((state) => state.contact.error);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const firstName = useAppSelector((state) => state.user.user.firstName);
  const lastName = useAppSelector((state) => state.user.user.lastName);
  const userEmail = useAppSelector((state) => state.user.user.email);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  // Show notification on success or error, then reset
  useEffect(() => {
    if (!loaded) {
      // Still loading
      return;
    }

    // Request completed (success or error)
    if (successful || error) {
      setShowNotification(true);

      const timer = setTimeout(() => {
        if (successful) {
          dispatch(resetContact());
        }
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loaded, successful, error, dispatch]);

  const handleSend = () => {
    dispatch(sendMessage({ language: language }));
  };

  // Determine display values based on login status
  const displayName = loggedIn ? `${firstName} ${lastName}`.trim() : name;
  const displayEmail = loggedIn ? userEmail : email;
  
  // Validate email format
  const isEmailValid = displayEmail.match("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$");

  return (
    <>
      <h2 className="text-lg">{t("main.contact.form.headline")}</h2>
      {!loggedIn && (
        <>
          <TextInput
            id="txt-contact-name"
            label={t("main.contact.form.name")}
            value={name}
            onChange={(value: string) => dispatch(setName(value))}
          />
          <TextInput
            id="txt-contact-email"
            label={t("main.contact.form.email")}
            value={email}
            errorMessage={
              !isEmailValid &&
              email.length > 0
                ? t("main.contact.email-invalid")
                : undefined
            }
            onChange={(value: string) => dispatch(setEmail(value))}
          />
        </>
      )}
      <TextareaInput
        id="txt-contact-message"
        label={t("main.contact.form.message")}
        value={message}
        onChange={(value: string) => dispatch(setMessage(value))}
      />
      <Button
        id="btn-contact-send"
        text={t("main.contact.form.submit")}
        icon="PaperAirplaneIcon"
        className="mt-4 w-fit"
        disabled={
          loggedIn
            ? message.length === 0 || !isEmailValid
            : displayName.length === 0 || displayEmail.length === 0 || message.length === 0 || !isEmailValid
        }
        loading={!loaded}
        onClick={handleSend}
      />
      <Notification
        id="contact-notification"
        header={
          error
            ? t("main.contact.send-failed")
            : t("main.contact.send-success")
        }
        description={
          error
            ? error
            : t("main.contact.send-success-description")
        }
        type={error ? "error" : "success"}
        autoClose={true}
        autoCloseDelay={3000}
        isVisible={showNotification}
      />
    </>
  );
}
