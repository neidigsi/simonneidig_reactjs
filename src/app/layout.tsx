"use client";

// Import external dependencies
import { Montserrat_Alternates } from "next/font/google";
import { Provider } from "react-redux";

// Import internal dependencies
import "@/assets/scss/main.scss";
import { store } from "@/store/store";
import Main from "@/components/general/main";

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
          <Main>{children}</Main>
        </Provider>
      </body>
    </html>
  );
}
