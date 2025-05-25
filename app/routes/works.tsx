// Import external dependencies
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import Card from "@/components/general/card/card";
import PortfolioList from '@/components/works/portfolio/portfolioList';
import "@/assets/css/main.css";

export default function Works() {
  const { t } = useTranslation();

  return (
    <Card headline={t("main.works.title")}>
      <PortfolioList />
    </Card>
  );
}
