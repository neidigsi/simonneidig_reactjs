// Import external dependencies
import { JSX, useState } from "react";

// Import internal dependencies
import Icon from "@/components/general/icon";
import Loader from "@/components/general/loader/loader";

interface ButtonProps {
  id?: string;
  text: string;
  icon: any;
  onClick: () => void;
  loading?: boolean;
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
  loading = false,
  inverted = false,
  disabled = false,
  className = "",
}: Readonly<ButtonProps>): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      id={id}
      className={`glass-button glass-shine flex h-10 items-center justify-center px-4 py-2 rounded-2xl text-base 
        ${className} 
        ${
          (inverted && !isHovered) || (!inverted && isHovered)
            ? "glass-button-primary"
            : "text-black dark:text-white"
        }
        ${disabled && "cursor-not-allowed opacity-50 saturate-50"}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? (
        <>
          <Loader size={2} color="white" darkColor="white" />
        </>
      ) : (
        <>
          <Icon icon={icon} className="size-5 mr-2" /> {text}
        </>
      )}
    </button>
  );
}
