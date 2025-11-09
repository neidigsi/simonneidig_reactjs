// Import internal dependencies
import type { Portfolio } from "@/store/slices/worksSlice";

/**
 * PortfolioItem Component
 *
 * Renders a single portfolio entry as a clickable card, displaying a thumbnail, categories, and title.
 * Opens the portfolio URL in a new tab when clicked. Alternates background color for visual distinction.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {number} props.index - The index of the portfolio item in the list.
 * @param {Portfolio} props.portfolio - The portfolio data to display.
 *
 * @returns {JSX.Element} The rendered portfolio item component.
 */
export default function PortfolioItem({
  index,
  portfolio,
}: Readonly<{
  index: number;
  portfolio: Portfolio;
}>) {
  return (
    <div>
      <button
        onClick={() => window.open(portfolio.url, "_blank")}
        className={
          "grid grid-cols-1 gap-2 w-full rounded-xl p-5 text-start transition-transform transform hover:scale-105 " +
          +(portfolio.color == "primary"
            ? "lg:bg-primary/20"
            : "lg:bg-secondary/20") +
          (index % 2 == 0 ? " bg-primary/20" : " bg-secondary/20")
        }
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/image/${
            portfolio.thumbnail_id
          }`}
          alt={portfolio.title}
          className="rounded-xl"
        />
        <div className="text-sm text-dark-grey">
          {portfolio.categories
            .map((cat: any) => cat?.name)
            .filter(Boolean)
            .join(", ")}
        </div>
        <h3>{portfolio.title}</h3>
      </button>
    </div>
  );
}
