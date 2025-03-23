// Import internal dependencies
import NavigationItem from "@/components/navigation/navigationItem";

type NavigationObject = {
  path: string;
  icon: string;
  text: string;
};

const navigation: NavigationObject[] = [
  { path: "/", icon: "UserIcon", text: "About" },
  { path: "/resume", icon: "DocumentCheckIcon", text: "Resume" },
  { path: "/works", icon: "BriefcaseIcon", text: "Works" },
  { path: "/contact", icon: "EnvelopeIcon", text: "Contact" },
];

export default function Navigation() {

  return (
    <div className="flex justify-end">
      <div className="grid grid-cols-4 gap-2 bg-white p-2 rounded-2xl drop-shadow-xl">
        {navigation.map(({ path, icon, text }) => (
          <NavigationItem
            key={text}
            text={text}
            path={path}
            icon={icon}
            active={false}
          />
        ))}
      </div>
    </div>
  );
}
