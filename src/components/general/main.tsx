"use client";

// Import internal dependencies
import Loader from "@/components/general/loader";
import { Montserrat_Alternates } from "next/font/google";
import { Provider } from "react-redux";

// Import internal dependencies
import "@/assets/scss/main.scss";
import { store } from "@/store/store";
import Home from "@/pages/home";
import Navigation from "../navigation/navigation";
import Sidebar from "../sidebar/sidebar";

const montserrat = Montserrat_Alternates({
  weight: ["200", "700"],
  subsets: ["latin"],
});

export default function Main() {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider store={store}>
          <div className="grid grid-cols-3 gap-8 max-w-[1350px] mx-8 w-screen">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2">
              <Navigation />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
