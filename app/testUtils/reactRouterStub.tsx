import { createContext, useContext, useState } from "react";
import type { JSX, ReactNode } from "react";

interface RouterContextValue {
  pathname: string;
  navigate: (to: string, options?: unknown) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: "/",
  navigate: () => {},
});

interface MemoryRouterProps {
  children?: ReactNode;
  initialEntries?: string[] | string;
}

export function MemoryRouter({
  children,
  initialEntries = ["/"],
}: MemoryRouterProps) {
  const [pathname, setPathname] = useState(
    String(Array.isArray(initialEntries) ? initialEntries[0] : initialEntries)
  );

  const navigate = (to: string) => {
    setPathname(to);
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return (to: string, options?: unknown) => {
    void options;
    navigate(to);
  };
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return {
    pathname,
    search: "",
    hash: "",
    state: null,
    key: "default",
  };
}

export function Navigate({ to }: { to: string }) {
  const { pathname } = useContext(RouterContext);
  if (pathname !== to) {
    useNavigate()(to);
  }
  return null;
}

export function Outlet(): JSX.Element | null {
  return null;
}

export default RouterContext;