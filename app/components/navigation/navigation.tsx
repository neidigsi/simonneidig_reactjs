// Import external dependencies
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import NavigationItem from "@/components/navigation/navigationItem";
import { useLocation } from "react-router";

export default function Navigation() {
  const location = useLocation();

  const { t } = useTranslation();

  return (
    <div className="flex justify-end">
      <div className="grid grid-cols-4 gap-2 bg-white dark:bg-dark-mode-background p-2 rounded-2xl drop-shadow-xl">
          <NavigationItem
            text={t("navigation.headlines.home")}
            path="/"
            icon="UserIcon"
            active={location.pathname === "/"}
          />
          <NavigationItem
            text={t("navigation.headlines.resume")}
            path="/resume"
            icon="DocumentCheckIcon"
            active={location.pathname === "/resume"}
          />
          <NavigationItem
            text={t("navigation.headlines.works")}
            path="/works"
            icon="BriefcaseIcon"
            active={location.pathname === "/works"}
          />
          <NavigationItem
            text={t("navigation.headlines.contact")}
            path="/contact"
            icon="EnvelopeIcon"
            active={location.pathname === "/contact"}
          />
      </div>
    </div>
  );
}
