"use client";

// Import external dependencies
import { Montserrat_Alternates } from "next/font/google";
import { Provider } from "react-redux";

// Import internal dependencies
import "@/assets/scss/main.scss";
import Sidebar from "@/components/sidebar/sidebar";
import Router from "@/router/router";
import { store } from "@/store/store";

const montserrat = Montserrat_Alternates({
  weight: ["200", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider store={store}>
          <div className="grid place-content-center bg-image">
            <div className="grid grid-cols-3 gap-8 max-w-[1350px] mx-8 w-screen">
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-2">
                <Router>{children}</Router>
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
