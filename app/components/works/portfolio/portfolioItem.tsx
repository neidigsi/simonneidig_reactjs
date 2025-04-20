// Import internal dependencies
import type { Portfolio } from "@/store/slices/worksSlice";

export default function PortfolioItem({
  portfolio,
}: Readonly<{
  portfolio: Portfolio;
}>) {
  return (
    <div className="pt-4">
      <div
        className={
          "grid grid-cols-1 gap-2 w-full rounded-xl p-5 " +
          (portfolio.index % 2 == 1 ? "bg-primary/20" : "bg-secondary/20")
        }
      >
        <div className="text-base">{portfolio.categories.join(", ")}</div>
      </div>
    </div>
  );
}
