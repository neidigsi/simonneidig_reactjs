// Import external dependencies
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadWorks, filterWorks } from "@/store/slices/worksSlice";
import PortfolioItem from "@/components/works/portfolio/portfolioItem";
import Filter from "@/components/general/filter/filter";

export default function PortfolioList() {
  const filteredPortfolio = useAppSelector(
    (state) => state.works.filteredPortfolio
  );
  const loaded = useAppSelector((state) => state.works.loaded);
  const categories = useAppSelector((state) => state.works.categories);
  const currentFilter = useAppSelector((state) => state.works.currentFilter);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadWorks());
    }
  }, []);

  const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(filterWorks(event.currentTarget.innerHTML));
  };

  return (
    <div className="grid grid-cols-1">
      <Filter
        currentFilter={currentFilter}
        items={categories}
        onClick={handleFilterChange}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4">
        {filteredPortfolio.map((e) => (
          <PortfolioItem key={e.index} portfolio={e} />
        ))}
      </div>
    </div>
  );
}
