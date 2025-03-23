// Import internal dependencies
import { useEffect } from "react";

// Import internal dependencies
import "@/assets/scss/main.scss";
import StoreProvider from "@/store/storeProvider";
import Navigation from "../navigation/navigation";
import Sidebar from "../sidebar/sidebar";


export default function Main() {
  useEffect(() => {
    const WebFont = require('webfontloader');
  
    WebFont.load({
      google: {
        families: ['Montserrat Alternates:200,700'],
      },
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="grid grid-cols-3 gap-8 max-w(1350px) mx-8 w-screen">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2">
              <Navigation />
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
