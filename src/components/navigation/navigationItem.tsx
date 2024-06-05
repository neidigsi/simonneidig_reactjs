import { NavLink } from "react-router-dom";
import Icon from "@/components/general/icon";

interface NavigationItem {
  text: string;
  path: string;
  icon: string;
}

export default function NavigationItem({ text, path, icon }: NavigationItem) {
  return (
    <NavLink to={path}>
      <button className="nav-item">
        <div className="grid justify-items-center gap-1">
          <div className="size-6">
            <Icon icon={icon} />
          </div>
          {text}
        </div>
      </button>
    </NavLink>
  );
}
