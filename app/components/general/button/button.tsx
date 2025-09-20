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
 * Button component that renders a customizable button with an optional icon.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @param {Object} props - The properties object.
 * @param {string} [props.id="btn-default"] - The unique ID for the button.
 * @param {string} props.text - The text to display inside the button.
 * @param {any} props.icon - The icon to display inside the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {boolean} [props.inverted=false] - Whether the button should use inverted styles.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the button.
 * 
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
