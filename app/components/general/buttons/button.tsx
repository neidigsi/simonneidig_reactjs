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
      className={`flex h-10 items-center justify-center p-2 rounded-lg text-base 
        ${className} 
        ${
          (inverted && !isHovered) || (!inverted && isHovered)
            ? "bg-linear-to-r from-primary to-secondary text-white dark:text-black"
            : "text-black dark:text-white"
        }
        ${disabled && "p-2 rounded-lg text-base items-center text-dark-grey cursor-not-allowed opacity-50"}`}
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
