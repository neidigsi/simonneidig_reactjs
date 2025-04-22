// Import external dependencies
import { useTranslation } from "react-i18next";
import FooterItem from "./footerItem";

export default function Page() {
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
