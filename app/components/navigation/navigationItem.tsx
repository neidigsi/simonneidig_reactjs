// Import internal dependencies
import Icon from "@/components/general/icon";

interface NavigationItem {
  text: string;
  path: string;
  icon: string;
  active: boolean;
}

export default function NavigationItem({
  text,
  path,
  icon,
  active,
}: Readonly<NavigationItem>) {
  return (
    <button className={active ? "nav-item nav-item-active" : "nav-item"}>
      <div className="grid justify-items-center gap-1">
        <div className="size-5">
          <Icon icon={icon} />
        </div>
        {text}
      </div>
    </button>
  );
}
