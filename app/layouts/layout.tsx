// Import external dependencies
import StoreProvider from "@/store/storeProvider";

// Import internal dependencies
import SidebarLayout from "@/layouts/sidebarLayout";
import { Outlet } from "react-router";

/**
 * Layout Component
 *
 * This component defines the main application layout, wrapping all content with the Redux store provider
 * and the sidebar layout. It uses a responsive grid background that adapts to light and dark mode.
 * The <Outlet /> renders the currently active route's content inside the layout.
 * This ensures consistent structure, theming, and state management across all pages of the application.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param none - This component does not accept any props.
 *
 * @returns {JSX.Element} The main application layout, providing the Redux store context and sidebar layout. Renders the current route's content via <Outlet /> inside a styled grid background.
 */
export default function Layout() {
  return (
    <div
      className={
        "grid place-content-center bg-image bg-image-attributes dark:bg-image-dark"
      }
    >
      <StoreProvider>
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      </StoreProvider>
    </div>
  );
}
