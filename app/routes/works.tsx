// Import external dependencies
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadWorks } from "@/store/slices/worksSlice";
import Card from "@/components/general/card/card";
import PortfolioList from "@/components/works/portfolio/portfolioList";
import "@/assets/css/main.css";

export default function Works() {
  const loaded = useAppSelector((state) => state.works.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadWorks({ language: language }));
    }
  });

  return (
    <Card headline={t("main.works.title")} loaded={loaded}>
      <PortfolioList />
    </Card>
  );
}
