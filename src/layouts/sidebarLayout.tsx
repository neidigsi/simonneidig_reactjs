"use client";

// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import Loader from "@/components/general/loader";
import Navigation from "@/components/navigation/navigation";
import Icon from "@/components/general/icon";

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
        <div className="grid grid-cols-3 gap-8 max-w-[1350px] mx-8 w-screen">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-2 p-10">
            <div className="flex justify-end button-bar">
              <button className="btn-white">
                <div className="size-5">
                  <Icon icon="SunIcon" />
                </div>
              </button>
            </div>
            <div className="main-section">
              <Navigation />
              {children}
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
