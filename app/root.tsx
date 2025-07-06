// Import external dependencies
import { Outlet } from "react-router";

// Import internal dependencies
import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/x-icon",
    href: "/favicon.ico",
  },
];

export default function App() {
  return <Outlet />;
}
