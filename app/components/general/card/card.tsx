// Import internal dependencies
import Footer from "@/components/general/footer/footer";
import { JSX } from "react";

interface CardObject {
  headline: string;
  children: React.ReactNode;
}

/**
 * Card component that renders a styled container with a headline and content.
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {Object} props - The properties object.
 * @param {string} props.headline - The headline text to display at the top of the card.
 * @param {React.ReactNode} props.children - The content to display inside the card.
 * @returns {JSX.Element} The rendered card component.
 */
export default function Card({
  headline,
  children,
}: Readonly<CardObject>): JSX.Element {
  return (
    <div className="w-full h-fit bg-white dark:bg-dark-mode-background dark:text-white rounded-2xl drop-shadow-xl p-8 my-8">
      <div className="flex pt-5 items-center">
        <h1 className="pr-5">{headline}</h1>
        <div className="bg-gradient-to-r from-primary to-secondary w-48 h-0.5 rounded-lg"></div>
      </div>
      <div className="pt-5">{children}</div>
      <Footer />
    </div>
  );
}
