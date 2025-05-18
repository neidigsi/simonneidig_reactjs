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

  /**
   * Handles the click event on the navigation item.
   * It disables the back button and navigates to the specified path.
   */
  const handleClick = () => {
    if (!active) {
      dispatch(setBackButtonEnabled(false));
      navigate(path);
    }
  };

  return (
    <button
      className={active ? "nav-item nav-item-active active" : "nav-item"}
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
