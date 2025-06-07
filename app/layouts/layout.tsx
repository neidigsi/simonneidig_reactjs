// Import external dependencies
import StoreProvider from "@/store/storeProvider";

// Import internal dependencies
import SidebarLayout from "@/layouts/sidebarLayout";
import { Outlet } from "react-router";

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
