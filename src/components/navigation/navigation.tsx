import { UserIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import NavigationItem from "./navigationItem";

export default function Navigation() {
  return (
    <div className="flex justify-end">
      <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-3xl drop-shadow-xl">
        <NavigationItem text="About" path="/" icon="UserIcon" />
        <NavigationItem text="Resume" path="/resume" icon="DocumentCheckIcon" />
        <NavigationItem text="Works" path="/works" icon="BriefcaseIcon" />
        <NavigationItem text="Contact" path="/contact" icon="EnvelopeIcon" />
      </div>
    </div>
  );
}
