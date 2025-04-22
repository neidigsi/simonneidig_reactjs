// Import external dependencies
import { useNavigate } from "react-router";

export default function FooterItem({
  text,
  path,
}: Readonly<{ text: string; path?: string }>) {
  const navigate = useNavigate();

  return (
    <button
      className={`text-black dark:text-white ${
        path == undefined ? "" : "hover:cursor-pointer hover:text-primary"
      }`}
      onClick={() => {
        if (path) {
          navigate(path);
        }
      }}
    >
      {text}
    </button>
  );
}
