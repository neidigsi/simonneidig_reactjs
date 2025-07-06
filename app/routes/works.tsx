// Import external dependencies
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadWorks } from "@/store/slices/worksSlice";
import Card from "@/components/general/card/card";
import PortfolioList from "@/components/works/portfolio/portfolioList";
import "@/assets/css/main.css";

/**
 * Works Page Component
 *
 * This component displays the "Works" page, showing a list of portfolio projects.
 * It loads the works data from the Redux store, triggering an asynchronous fetch if the data is not yet loaded.
 * The page title is set dynamically based on the current language.
 * The PortfolioList component renders the portfolio entries inside a styled Card.
 * Tailwind CSS is used for layout and styling.
 * Integrates with Redux for state management and i18n for translations.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Works page.
 */
export default function Works() {
  const loaded = useAppSelector((state) => state.works.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadWorks({ language: language }));
    }
    document.title = t("main.works.title") + " | Simon Neidig";
  });

  return (
    <Card headline={t("main.works.title")} loaded={loaded}>
      <PortfolioList />
    </Card>
  );
}
