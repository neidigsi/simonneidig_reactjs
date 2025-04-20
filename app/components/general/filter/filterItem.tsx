/**
 * FilterItem Component
 *
 * This component renders a single filter item as a clickable element.
 * When hovered, the cursor changes to a pointer, and the text color changes to "text-primary".
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {string} item - The text to display for the filter item.
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
