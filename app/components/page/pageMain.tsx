// Import external dependencies
import { JSX, } from "react";

// Import internal dependencies
import Card from "@/components/general/card/card";

interface PageProps {
  title: string;
  text: string;
}

/**
 * Page Component
 *
 * This component renders a page with a headline and text content inside a card layout.
 * It ensures that the back button is enabled when the component is mounted.
 *
 * The component uses the `Card` component to display the content in a styled card format.
 * A page component is typically used to display information or content that is not part of the main navigation.
 *
 * @author Simon Neidig <mail@simonneidig.de>
 * @param {string} title - The headline of the page.
 * @param {string} text - The HTML content to display as the page text.
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function PageMain({
  title,
  text,
}: Readonly<PageProps>): JSX.Element {
  return (
    <Card headline={title}>
      <div className="text-base">
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </Card>
  );
}
