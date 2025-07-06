// Import internal dependencies
import Icon from "@/components/general/icon";

interface ExpertiseItemObject {
  index: number;
  color: string;
  expertise: string;
  description: string;
  icon: string;
}

/**
 * ExpertiseItem Component
 *
 * Displays a single expertise entry with icon, title, and description.
 * Alternates background color based on index and color for visual distinction.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {number} props.index - The index of the expertise item in the list.
 * @param {string} props.color - The color theme for the item.
 * @param {string} props.expertise - The title of the expertise.
 * @param {string} props.description - The description of the expertise.
 * @param {string} props.icon - The icon name to display.
 *
 * @returns {JSX.Element} The rendered expertise item component.
 */
export default function ExpertiseItem({
  index,
  color,
  expertise,
  description,
  icon,
}: Readonly<ExpertiseItemObject>) {
  return (
    <div
      className={
        "grid grid-cols-5 w-full rounded-xl py-5 transition-transform transform hover:scale-105 " +
        (color == "primary" ? "lg:bg-primary/20" : "lg:bg-secondary/20") +
        (index % 2 == 0 ? " bg-primary/20" : " bg-secondary/20")
      }
    >
      <div className="grid col-span-1 justify-items-center ">
        <div className="m-3">
          <div className="size-7">
            <Icon icon={icon} />
          </div>
        </div>
      </div>
      <div className="col-span-4 pr-5">
        <h3 className="pb-3">{expertise}</h3>
        <div className="text-base">{description}</div>
      </div>
    </div>
  );
}
