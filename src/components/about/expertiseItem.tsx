// Import internal dependencies
import Icon from "@/components/general/icon";

interface ExpertiseItemObject {
  color: string;
  expertise: string;
  description: string;
  icon: string;
}

export default function ExpertiseItem({
  color,
  expertise,
  description,
  icon,
}: Readonly<ExpertiseItemObject>) {
  return (
    <div
      className={
        "grid grid-cols-5 w-full rounded-2xl bg-opacity-20 py-5 bg-" + color
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
