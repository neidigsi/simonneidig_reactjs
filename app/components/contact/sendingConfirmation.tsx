// Import internal dependencies
import { resetContact } from "@/store/slices/contactSlice";
import Button from "@/components/general/button/button";

// Import external dependencies
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { JSX } from "react";

/**
 * SendingConfirmation Component
 *
 * This component displays a confirmation message after a contact form has been successfully sent.
 * It shows a personalized greeting, a confirmation message, and a success image.
 * Two buttons are provided: one to return to the home page and one to reset the contact form.
 *
 * Features:
 * - Displays the user's name in the confirmation headline.
 * - Shows a localized confirmation message and image.
 * - "Return Home" button navigates to the home page.
 * - "Return to Contact" button resets the contact form state.
 *
 * Usage:
 * <SendingConfirmation />
 * 
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @returns {JSX.Element} The rendered SendingConfirmation component.
 */

export default function SendingConfirmation(): JSX.Element {
  const navigate = useNavigate();

  const name = useAppSelector((state) => state.contact.name);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <>
      <h2 className="text-lg">
        {t("main.contact.confirmation.headline")}, {name}!
      </h2>
      {t("main.contact.confirmation.message")}
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/sendingSuccess.png"
          alt="Successfully sent"
          className="rounded-xl max-w-[400px] mb-6"
        />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Button
          id="btn-contact-return-to-home"
          text={t("main.contact.confirmation.return-home")}
          icon="ArrowUturnLeftIcon"
          inverted={true}
          onClick={() => navigate("/")}
        />
        <Button
          id="btn-contact-return-to-form"
          text={t("main.contact.confirmation.return-to-contact")}
          icon="EnvelopeIcon"
          onClick={() => dispatch(resetContact())}
        />
      </div>
    </>
  );
}
