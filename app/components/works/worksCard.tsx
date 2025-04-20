// Import external dependencies
import { useTranslation } from 'react-i18next';

// Import internal dependencies
import Card from "@/components/general/card";
import PortfolioList from './portfolio/portfolioList';

export default function WorksCard() {
  const { t } = useTranslation();

  return (
    <Card headline={t("main.works.title")}>
      <PortfolioList />
    </Card>
  );
}
