// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import Loader from "@/components/general/loader";
import Navigation from "@/components/navigation/navigation";
import Icon from "@/components/general/icon";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";

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
          <div className="mx-8 grid gap-8 grid-cols-7">
            <div className="col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-5">
              <div className="flex justify-end button-bar">
                <button className="btn bg-white dark:bg-dark-mode-background mr-2">
                  <div className="size-5">
                    <Icon icon="FlagIcon" />
                  </div>
                </button>
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
