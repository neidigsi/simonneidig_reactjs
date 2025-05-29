// Import external dependencies
import { JSX } from "react";

// Import internal dependencies
import Footer from "@/components/general/footer/footer";
import Loader from "@/components/general/loader/loader";

interface CardObject {
  headline: string;
  loaded?: boolean;
  children: React.ReactNode;
}

/**
 * Card component that renders a styled container with a headline and content.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * @param {Object} props - The properties object.
 * @param {string} props.headline - The headline text to display at the top of the card.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @returns {JSX.Element} The rendered card component.
 */
export default function Card({
  headline,
  loaded = true,
  children,
}: Readonly<CardObject>): JSX.Element {
  return (
    <div className="w-full h-fit bg-white dark:bg-dark-mode-background dark:text-white rounded-2xl drop-shadow-xl p-8 my-8">
      <div className="flex pt-5 items-center">
        <h1 className="pr-5">{headline}</h1>
        <div className="bg-gradient-to-r from-primary to-secondary w-48 h-0.5 rounded-lg"></div>
      </div>
      <div className="pt-5">
        {loaded ? (
          children
        ) : (
          <div className="grid h-71 place-items-center">
            <Loader size={5} color="secondary" darkColor="white" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
