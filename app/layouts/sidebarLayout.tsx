// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import Loader from "@/components/general/loader";
import Navigation from "@/components/navigation/navigation";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";
import LanguageSwitcher from "@/components/actionBar/languageSwitcher";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loaded = useAppSelector((state) => state.personalInfo.loaded);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPersonalInfo());
  }, []);

  return (
    <>
      {loaded ? (
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
                <Navigation />
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-screen w-screen">
          <Loader size={5} color="white" />
        </div>
      )}
    </>
  );
}
