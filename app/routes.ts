import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/index.tsx"),
    route("resume", "routes/resume.tsx"),
    route("contact", "routes/contact.tsx"),
    route("works", "routes/works.tsx"),
  ]),
] satisfies RouteConfig;
