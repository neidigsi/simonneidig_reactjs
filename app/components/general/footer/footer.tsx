// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import FooterItem from "@/components/general/footer/footerItem";


export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center relative mt-8 gap-4">
      <FooterItem
        text={t("footer.copyright") + " " + new Date().getFullYear()}
      />
      <FooterItem text={t("footer.imprint")} path="/imprint" />
      <FooterItem text={t("footer.privacy")} path="/privacy" />
    </div>
  );
}
