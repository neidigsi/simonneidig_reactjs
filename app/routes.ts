import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/index.tsx"),
    route("contact", "routes/contact.tsx"),
    route("resume", "routes/resume.tsx"),
    route("works", "routes/works.tsx"),
    route("page/:path", "routes/page.tsx"),
    route("*", "routes/error404.tsx"),
  ]),
] satisfies RouteConfig;
