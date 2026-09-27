import React, { JSX } from "react";
import Icon from "@/components/general/icon";

interface SmallButtonProps {
  id?: string;
  text: string;
  active?: boolean;
  onClick: any;
  className?: string;
}

export default function TextButton({
  id = "sm-btn-default",
  text,
  active,
  onClick,
  className = "",
}: Readonly<SmallButtonProps>): JSX.Element {
  return (
    <button
      id={id}
      className={`liquid-underline hover:cursor-pointer hover:text-primary transition-colors duration-300 ${
        active ? "text-primary liquid-underline-active" : "text-black dark:text-white"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
