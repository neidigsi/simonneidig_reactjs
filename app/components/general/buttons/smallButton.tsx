import React, { JSX } from "react";
import Icon from "@/components/general/icon";

interface SmallButtonProps {
  id?: string;
  title: string;
  icon?: string;
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Button component that renders a customizable small button with an icon. There is no text inside the button.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.id="sm-btn-default"] - The unique ID for the button.
 * @param {string} props.title - The title of the button the button.
 * @param {any} props.icon - The icon to display inside the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
export default function SmallButton({
  id = "sm-btn-default",
  title,
  icon,
  children,
  onClick,
  disabled = false,
  className = "",
}: Readonly<SmallButtonProps>): JSX.Element {
  return (
    <button
      id={id}
      type="button"
      title={title}
      aria-label={title}
      className={`btn bg-white m-1 dark:bg-dark-mode-background ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="size-5">
        {icon && <Icon icon={icon} />}
        {children}
        </div>
    </button>
  );
}
