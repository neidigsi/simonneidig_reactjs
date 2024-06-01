import SocialMedia from "./socialMedia";

export default function Sidebar() {
  return (
    <div className="grid col-span-1 h-screen items-end">
      <div>
        <div className="bg-primary">Sidebar</div>
        <div className="bg-white grid justify-center">
            <h2 className="text-center">
                Simon Neidig
            </h2>
            <SocialMedia />
        </div>
      </div>
    </div>
  );
}
