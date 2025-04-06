// Import internal dependencies
import Icon from "@/components/general/icon";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button className={active ? "nav-item active" : "nav-item"} onClick={handleClick}>
      <div className="grid justify-items-center gap-1">
        <div className="size-5">
          <Icon icon={icon} />
        </div>
        {text}
      </div>
    </button>
  );
}
