// Import external dependencies
import { JSX, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import { useAppSelector } from "@/store/hooks";
import ContactForm from "@/components/routes/contact/contactForm";
import SendingConfirmation from "@/components/routes/contact/sendingConfirmation";
import ContactMessagesTable from "@/components/routes/contact/contactMessagesTable";
import Card from "@/components/general/card/card";
import "@/assets/css/main.css";


/**
 * Contact Page Component
 *
 * This component renders the contact page with two distinct views:
 * 
 * User View:
 * - Displays a localized contact form for user input.
 * - Shows a confirmation message after successful submission.
 * - Uses Redux state to determine which view to render.
 *
 * Admin View (for logged-in users with admin privileges):
 * - Displays a table of all contact messages received
 * - Allows sorting and pagination through submissions
 * - Shows detailed information including timestamps
 *
 * Features:
 * - Displays a localized contact form for user input.
 * - Shows a confirmation message after successful submission.
 * - Shows admin panel with message table for superusers.
 * - Uses Redux state to determine which view to render.
 * - Sets the page title dynamically based on the current language.
 * - Utilizes Tailwind CSS for layout and styling.
 * - Integrates with Redux for state management and i18n for translations.
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
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const isSuperUser = useAppSelector((state) => state.user.user.isSuperUser);

  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("main.contact.title") + " | Simon Neidig";
  })

  return (
    <div className="w-full">
      {
        loggedIn && isSuperUser ?
          (
            <div className="mt-8">
              <Card headline={t("main.contact.title") || "Admin Panel: Contact Messages"}>
                <ContactMessagesTable />
              </Card>
            </div>
          ) :
          (
            <Card headline={t("main.contact.title")}>
              {t("main.contact.description")}
              <div className="mt-4 grid grid-cols-1 gap-2 w-full rounded-xl p-5 bg-dark-grey/15 text-base">
                {sentSuccessfully ? <SendingConfirmation /> : <ContactForm />}
              </div>
            </Card>
          )
      }
    </div>
  );
}
