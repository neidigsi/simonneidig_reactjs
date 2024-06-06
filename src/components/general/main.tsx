"use client";

// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import Router from "@/router/router";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import Loader from "@/components/general/loader";

export default function Main({
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
    <div className="grid place-content-center bg-image">
      {loaded ? (
        <Router>{children}</Router>
      ) : (
        <div className="grid h-screen w-screen">
          <Loader size={5} color="white" />
        </div>
      )}
    </div>
  );
}
