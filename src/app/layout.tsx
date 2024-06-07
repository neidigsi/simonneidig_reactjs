// Import external dependencies
import { Provider } from "react-redux";
import { Montserrat_Alternates } from "next/font/google";

// Import internal dependencies
import "@/assets/scss/main.scss";
import { store } from "@/store/store";
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
      <Provider store={store}>
        <SidebarLayout>{children}</SidebarLayout>
      </Provider>
    </div>
  );
}
