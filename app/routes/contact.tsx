// Import external dependencies
import { JSX } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import { useAppSelector } from "@/store/hooks";
import ContactForm from "@/components/contact/contactForm";
import SendingConfirmation from "@/components/contact/sendingConfirmation";
import Card from "@/components/general/card/card";
import "@/assets/css/main.css";


/**
 * Contact Page Component
 *
 * This component renders the contact page, including a headline, description, and a card containing
 * either the contact form or a sending confirmation, depending on the submission state.
 *
 * Features:
 * - Displays a localized contact form for user input.
 * - Shows a confirmation message after successful submission.
 * - Uses Redux state to determine which view to render.
 *
 * Usage:
 * <Contact />
 * 
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @returns {JSX.Element} The rendered Contact component.
 */
export default function Contact(): JSX.Element {
  const sentSuccessfully = useAppSelector(
    (state) => state.contact.sentSuccessfully
  );

  const { t } = useTranslation();

  return (
    <Card headline={t("main.contact.title")}>
      {t("main.contact.description")}
      <div className="mt-4 grid grid-cols-1 gap-2 w-full rounded-xl p-5 bg-dark-grey/20 text-base">
        {sentSuccessfully ? <SendingConfirmation /> : <ContactForm />}
      </div>
    </Card>
  );
}
