// Import external dependencies
import { useEffect, useRef } from "react";
import i18n from "i18next";
import { useLocation } from "react-router";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import { useAppDispatch } from "@/store/hooks";
import Navigation from "@/components/navigation/navigation";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";
import LanguageSwitcher from "@/components/actionBar/languageSwitcher";
import { changeLanguage } from "@/store/slices/settingsSlice";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    dispatch(changeLanguage(i18n.language));
  }, []);

  useEffect(() => {
    // Only scroll on small screens and if route changed
    const mdBreakpoint =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--tw-breakpoint-md"
        )
      ) || 768;
    if (
      prevPathRef.current !== location.pathname &&
      window.innerWidth < mdBreakpoint &&
      navRef.current
    ) {
      navRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="max-w-[1350px] w-screen">
      <div className="mx-8 grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-7">
        <div className="col-span-1 md:col-span-1 lg:col-span-3 xl:col-span-2">
          <div className="md:hidden flex justify-end button-bar">
            <LanguageSwitcher />
            <DarkModeToggl />
          </div>
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-5 xl:col-span-5">
          <div className="hidden md:flex justify-end button-bar">
            <LanguageSwitcher />
            <DarkModeToggl />
          </div>
          <div className="main-section">
            <Navigation navRef={navRef} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
