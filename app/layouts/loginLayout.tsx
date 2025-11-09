// Import external dependencies
import StoreProvider from "@/store/storeProvider";

// Import internal dependencies
import { Outlet } from "react-router";

/**
 * LoginLayout Component
 *
 * This layout component provides the main structure for pages that require a login context.
 * It wraps the content in a styled grid background and provides the Redux store context to all child components.
 *
 * Features:
 * - Provides a full-screen grid layout with a background image.
 * - Wraps the application in a Redux store provider for global state management.
 * - Renders the current route's content dynamically via the `<Outlet />` component.
 *
 * Usage:
 * - Used as a layout for routes that require a login context.
 * - Ensures consistent styling and state management across all child components.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered LoginLayout component.
 */
export default function Layout() {
  return (
    <div
      className={
        "grid place-content-center bg-image bg-image-attributes dark:bg-image-dark w-screen h-screen"
      }
    >
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    </div>
  );
}
