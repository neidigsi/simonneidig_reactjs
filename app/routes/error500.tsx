// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { JSX, useEffect } from "react";

// Import internal dependencies
import "@/assets/css/main.css";
import Card from "@/components/general/card/card";
import Button from "@/components/general/button/button";

/**
 * Error500 Component
 *
 * Displays a 500 error page when a server error occurs.
 * This component uses i18n for translations and provides a button
 * to navigate back to the home page.
 *
 * Features:
 * - Localized headline and description for the 500 error
 * - Displays an appropriate error image
 * - Button to navigate back to the home page
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @returns {JSX.Element} The rendered Error500 component
 */
export default function Error500(): JSX.Element {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "500 | Simon Neidig";
  });

  return (
    <Card headline={t("error.server-error.title")}>
      <div className="flex flex-col items-center justify-center mb-4">
        <img
          src="/images/500.png"
          alt="500 Server Error"
          className="rounded-xl max-w-[400px] mb-6"
        />
        <p className="mb-4">{t("error.server-error.description")}</p>
        <Button
          text={t("error.server-error.button")}
          icon="ArrowUturnLeftIcon"
          onClick={() => navigate("/")}
          inverted={true}
          className="mt-4"
        />
      </div>
    </Card>
  );
}
