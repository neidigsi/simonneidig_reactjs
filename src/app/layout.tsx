// Import external dependencies
import { Montserrat_Alternates } from "next/font/google";
import StoreProvider from "@/app/storeProvider";

// Import internal dependencies
import "@/assets/scss/main.scss";
import SidebarLayout from "@/layouts/sidebarLayout";

const montserrat = Montserrat_Alternates({
  weight: ["200", "700"],
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={"grid place-content-center bg-image " + montserrat.className}
    >
      <StoreProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </StoreProvider>
    </div>
  );
}
