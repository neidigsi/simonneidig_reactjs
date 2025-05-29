// Import internal dependencies
import FilterItem from "@/components/general/filter/filterItem";

interface FilterProps {
  currentFilter: string;
  items: string[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Filter Component
 *
 * This component renders a list of filter items horizontally.
 * Each item is displayed using the `FilterItem` component.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * @param {string[]} items - An array of strings representing the filter items to display.
 */
export default function Filter({
  currentFilter,
  items,
  onClick,
}: Readonly<FilterProps>) {

  return (
    <div className="flex flex-wrap items-end justify-end gap-x-6 gap-y-2">
      {items.map((i) => (
        <FilterItem
          key={i}
          item={i}
          active={i == currentFilter}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
