import React, { JSX } from "react";
import Icon from "@/components/general/icon";

interface ButtonProps {
  id?: string;
  text: string;
  icon: any;
  onClick: () => void;
  inverted?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 *
 * @author Simon Neidig <mail@simon-neidig.eu>

 * @returns {JSX.Element} The rendered button component.
 */
export default function Button({
  id = "btn-default",
  text,
  icon,
  onClick,
  inverted = false,
  disabled = false,
  className = "",
}: Readonly<ButtonProps>): JSX.Element {
  return (
    <button
      id={id}
      className={`flex 
        ${className} 
        ${inverted ? "btn-inverted" : "btn"}
      ${disabled && "btn-disabled"}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} className="size-5 mr-2" /> {text}
    </button>
  );
}
