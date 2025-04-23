// Import internal dependencies
import Icon from "@/components/general/icon";
import { useNavigate } from "react-router";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import { useAppDispatch } from "@/store/hooks";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(path);
    dispatch(setBackButtonEnabled(false));
  };

  return (
    <button
      className={active ? "nav-item active" : "nav-item"}
      onClick={handleClick}
    >
      <div className="grid justify-items-center gap-1">
        <div className="size-5">
          <Icon icon={icon} />
        </div>
        {text}
      </div>
    </button>
  );
}
