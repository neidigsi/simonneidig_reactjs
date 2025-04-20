// Import internal dependencies
import FilterItem from "@/components/general/filter/filterItem";

interface FilterProps {
  items: string[];
}

/**
 * Filter Component
 *
 * This component renders a list of filter items horizontally.
 * Each item is displayed using the `FilterItem` component.
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {string[]} items - An array of strings representing the filter items to display.
 */
export default function Filter({ items }: Readonly<FilterProps>) {
  return (
    <div className="flex items-end justify-end space-x-6">
      {items.map((i) => (
        <FilterItem key={i} item={i} />
      ))}
    </div>
  );
}
