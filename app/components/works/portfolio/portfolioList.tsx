// Import external dependencies
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadWorks } from "@/store/slices/worksSlice";
import PortfolioItem from "@/components/works/portfolio/portfolioItem";
import Filter from "@/components/general/filter/filter";

export default function PortfolioList() {
  const educations = useAppSelector((state) => state.works.portfolio);
  const loaded = useAppSelector((state) => state.works.loaded);
  const categories = useAppSelector((state) => state.works.categories);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadWorks());
    }
  }, []);

  return (
    <div className="grid grid-cols-1">
        <Filter items={categories} />
        {educations.map((e) => (
          <PortfolioItem key={e.index} portfolio={e} />
        ))}
    </div>
  );
}
