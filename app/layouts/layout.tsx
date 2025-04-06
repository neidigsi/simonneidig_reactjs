// Import external dependencies
import StoreProvider from "@/store/storeProvider";

// Import internal dependencies
import SidebarLayout from "@/layouts/sidebarLayout";
import { Outlet } from "react-router";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"grid place-content-center bg-image"}>
      <StoreProvider>
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      </StoreProvider>
    </div>
  );
}
