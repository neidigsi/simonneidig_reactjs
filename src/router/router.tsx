import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/errorPage";
import Works from "@/pages/works";
import Resume from "@/pages/resume";
import Home from "@/pages/home";
import Contact from "@/pages/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "resume",
        element: <Resume />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default function MainSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RouterProvider router={router} />;
}
