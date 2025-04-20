export default function FooterItem({
  text,
  path,
}: Readonly<{ text: string; path?: string }>) {
  return (
    <button
      className={`text-black dark:text-white ${
        path == undefined ? "" : "hover:cursor-pointer hover:text-primary"
      }`}
    >
      {text}
    </button>
  );
}
