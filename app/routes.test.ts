jest.mock("@react-router/dev/routes", () => ({
  index: (file: string) => ({ kind: "index", file }),
  layout: (file: string, children: unknown) => ({ kind: "layout", file, children }),
  route: (path: string, file: string) => ({ kind: "route", path, file }),
}));

import routes from "@/routes";

interface MockRoute {
  kind: string;
  file?: string;
  path?: string;
  children?: MockRoute[];
}

describe("route config", () => {
  const config = routes as unknown as MockRoute[];

  it("declares a main layout and a login layout", () => {
    expect(config).toHaveLength(2);
    expect(config[0]).toMatchObject({ kind: "layout", file: "layouts/layout.tsx" });
    expect(config[1]).toMatchObject({ kind: "layout", file: "layouts/loginLayout.tsx" });
  });

  it("maps the main pages into the main layout", () => {
    const children = config[0].children ?? [];
    expect(children).toContainEqual({ kind: "index", file: "routes/about.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "contact", file: "routes/contact.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "resume", file: "routes/resume.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "works", file: "routes/works.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "page/:path", file: "routes/page.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "profile", file: "routes/profile.tsx" });
  });

  it("maps error pages into the main layout", () => {
    const children = config[0].children ?? [];
    expect(children).toContainEqual({ kind: "route", path: "*", file: "routes/error404.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "error", file: "routes/error500.tsx" });
  });

  it("maps login and register into the login layout", () => {
    const children = config[1].children ?? [];
    expect(children).toContainEqual({ kind: "route", path: "login", file: "routes/login.tsx" });
    expect(children).toContainEqual({ kind: "route", path: "register", file: "routes/register.tsx" });
  });
});
