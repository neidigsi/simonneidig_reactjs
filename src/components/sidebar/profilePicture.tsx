export default function ProfilePicture() {
  return (
    <div className="flex justify-center relative">
      <div className="profile-picture h-60 w-60 rounded-2xl z-10" />
      <div className="bg-white h-24 w-full rounded-t-2xl z-0 absolute bottom-0"></div>
    </div>
  );
}
