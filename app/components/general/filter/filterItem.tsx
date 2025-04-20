/**
 * FilterItem Component
 * 
 * This component renders a single filter item as a clickable element.
 * When hovered, the cursor changes to a pointer, and the text color changes to "text-primary".
 * 
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {string} item - The text to display for the filter item.
 */
export default function FilterItem({ item }: Readonly<{ item: string }>) {
  return <div className="hover:cursor-pointer hover:text-primary">{item}</div>;
}
