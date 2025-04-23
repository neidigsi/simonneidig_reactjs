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
    route("imprint", "routes/imprint.tsx"),
    route("privacy", "routes/privacyPolicy.tsx"),
    route("resume", "routes/resume.tsx"),
    route("works", "routes/works.tsx"),
  ]),
] satisfies RouteConfig;
