// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { filterWorks } from "@/store/slices/worksSlice";
import PortfolioItem from "@/components/works/portfolio/portfolioItem";
import Filter from "@/components/general/filter/filter";

/**
 * PortfolioList Component
 *
 * Displays a list of portfolio items with filter functionality.
 * Renders a filter bar and a grid of PortfolioItem components based on the selected filter.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none
 *
 * @returns {JSX.Element} The rendered portfolio list component.
 */
export default function PortfolioList() {
  const filteredPortfolio = useAppSelector(
    (state) => state.works.filteredPortfolio
  );
  const categories = useAppSelector((state) => state.works.categories);
  const currentFilter = useAppSelector((state) => state.works.currentFilter);

  const dispatch = useAppDispatch();

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
        {filteredPortfolio.map((e, index) => (
          <PortfolioItem index={index} key={e.id} portfolio={e} />
        ))}
      </div>
    </div>
  );
}
