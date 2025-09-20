// Import internal dependencies
import Icon from "@/components/general/icon";

interface PersonalInfoItemObject {
  label: string;
  value: string;
  icon: string;
}

/**
 * PersonalInfoItem Component
 *
 * Renders a single personal information item with an icon, label, and value.
 * The icon is displayed in a styled box, and the label/value are shown next to it.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {string} props.label - The label for the information.
 * @param {string} props.value - The value of the information.
 * @param {string} props.icon - The icon name to display.
 *
 * @returns {JSX.Element} The rendered personal info item component.
 */
export default function PersonalInfoItem({
  label,
  value,
  icon,
}: Readonly<PersonalInfoItemObject>) {
  return (
    <div className="grid grid-cols-4 w-full my-1 gap-2 ">
      <div className="grid col-span-1 items-center justify-items-center ">
        <div className=" bg-white dark:bg-dark-mode-background text-primary rounded-lg drop-shadow-xl">
          <div className="m-3">
            <div className="size-7">
              <Icon icon={icon} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 my-2">
        <div className="text-dark-grey col-span-4 text-sm">{label}</div>
        <div className="text-base">{value}</div>
      </div>
    </div>
  );
}
