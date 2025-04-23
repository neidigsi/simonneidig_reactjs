// Import external dependencies
import { useTranslation } from "react-i18next";

// Import internal dependencies
import "@/assets/css/main.css";
import Page from "@/components/general/page/page";

export default function Imprint() {
  const { t } = useTranslation();

  return <Page title={t("footer.imprint")} text="abc" />;
}
