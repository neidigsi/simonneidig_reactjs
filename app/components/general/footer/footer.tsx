// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import FooterItem from "@/components/general/footer/footerItem";

/**
 * Footer Component
 *
 * Renders the footer section with copyright,
 * imprint, and privacy links. Uses translation for text.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center relative mt-4 md:mt-8 gap-4">
      <FooterItem
        text={t("footer.copyright") + " " + new Date().getFullYear()}
      />
      <FooterItem text={t("footer.imprint")} path="/page/imprint" />
      <FooterItem text={t("footer.privacy")} path="/page/privacy" />
    </div>
  );
}
