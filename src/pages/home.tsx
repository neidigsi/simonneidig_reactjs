import Loader from "@/components/general/loader";
import Navigation from "@/components/navigation/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8 max-w-[1350px] mx-8 w-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-2">
        <Navigation />
        <Loader size={5} color="white" />
        <Outlet />
      </div>
    </div>
  );
}
