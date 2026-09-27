// Import external dependencies
import { JSX } from "react";

// Import internal dependencies
import Footer from "@/components/general/footer/footer";
import Loader from "@/components/general/loader/loader";

interface CardObject {
  headline: string;
  loaded?: boolean;
  children: React.ReactNode;
  footer?: boolean;
  className?: string;
}

/**
 * Card Component
 *
 * Card component that renders a styled container with a headline and content.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {string} props.headline - The headline text to display at the top of the card.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 *
 * @returns {JSX.Element} The rendered card component.
 */
export default function Card({
  headline,
  loaded = true,
  children,
  footer = true,
  className = "",
}: Readonly<CardObject>): JSX.Element {
  return (
    <div
      className={`glass glass-shine animate-glass-rise w-full h-fit dark:text-white rounded-[24px] p-4 md:p-8 my-4 md:my-8 ${className}`}
    >
      <div className="relative z-[1] flex pt-5 items-center">
        <h1 className="pr-5">{headline}</h1>
        <div className="liquid-headline-bar w-48 h-0.5 rounded-full"></div>
      </div>
      <div className="relative z-[1] pt-5">
        {loaded ? (
          children
        ) : (
          <div className="grid h-71 place-items-center">
            <Loader size={5} color="secondary" darkColor="white" />
          </div>
        )}
      </div>
      {footer && (
        <div className="relative z-[1]">
          <Footer />
        </div>
      )}
    </div>
  );
}
