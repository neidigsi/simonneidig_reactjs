import Navigation from "@/components/navigation/navigation";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navigation />
      Home
      <Outlet />
    </>
  );
}
