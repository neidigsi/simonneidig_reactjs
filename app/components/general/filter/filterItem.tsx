/**
 * FilterItem Component
 *
 * Renders a single filter item as a button. Highlights the item if active and calls onClick when clicked.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {string} item - The text to display for the filter item.
 * @param {boolean} active - Whether the filter item is currently active.
 * @param {function} onClick - The click handler for the filter item.
 *
 * @returns {JSX.Element} The rendered filter item component.
 */
export default function FilterItem({
  item,
  active,
  onClick,
}: Readonly<{ item: string; active: boolean; onClick: React.MouseEventHandler<HTMLButtonElement> }>) {
  return (
    <button
      className={`hover:cursor-pointer hover:text-primary ${
        active ? "text-primary" : "text-black dark:text-white"
      }`}
      onClick={onClick}
    >
      {item}
    </button>
  );
}
