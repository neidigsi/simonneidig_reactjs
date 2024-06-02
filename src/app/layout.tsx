import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "@/assets/scss/main.scss";
import Sidebar from "@/components/sidebar/sidebar";
import MainSection from "@/components/main/mainSection";

const montserrat = Montserrat_Alternates({
  weight: ["200", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simon Neidig",
  description: "Portfolio and Resume by Simon Neidig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="grid place-content-center bg-image">
          <div className="grid grid-cols-3 gap-8 max-w-[1400px] mx-8 w-screen">
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-2">
              <MainSection>{children}</MainSection>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
