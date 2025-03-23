// Import external dependencies
import StoreProvider from "@/store/storeProvider";

// Import internal dependencies
import SidebarLayout from "@/layouts/sidebarLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={"grid place-content-center bg-image"}
    >
      <StoreProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </StoreProvider>
    </div>
  );
}
