import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "@/assets/scss/main.scss";

const inter = Montserrat_Alternates({ weight: "100", subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
