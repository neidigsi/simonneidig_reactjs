import React from "react";
import Icon from "./icon";

interface ButtonProps {
  text: string;
  icon: any;
  onClick: () => void;
  inverted?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  inverted = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`flex ${className} ${inverted ? "btn-inverted" : ""} ${disabled ? "btn-disabled" : "btn"}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} className="size-5 mr-2" /> {text}
    </button>
  );
};

export default Button;
