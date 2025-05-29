// Import internal dependencies
import TextInput from "@/components/general/input/textInput";
import {
  setName,
  setEmail,
  setMessage,
  sendMessage,
} from "@/store/slices/contactSlice";
import Button from "@/components/general/button/button";
import TextareaInput from "@/components/general/input/textareaInput";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { JSX } from "react";

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
 * @returns {JSX.Element} The rendered SendingConfirmation component.
 */
export default function ContactForm(): JSX.Element {
  const name = useAppSelector((state) => state.contact.name);
  const email = useAppSelector((state) => state.contact.email);
  const message = useAppSelector((state) => state.contact.message);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <>
      <h2 className="text-lg">{t("main.contact.form.headline")}</h2>
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
        onChange={(value: string) => dispatch(setEmail(value))}
      />
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
        className="mt-4"
        disabled={
          name.length === 0 || email.length === 0 || message.length === 0
        }
        onClick={() => dispatch(sendMessage({ language: language }))}
      />
    </>
  );
}
