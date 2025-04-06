// Import internal dependencies
import SocialMediaButton from "@/components/sidebar/socialMedia/socialMediaButton";
import { useAppSelector } from "@/store/hooks";

export default function SocialMedia() {
  const socialMedia = useAppSelector((state) => state.personalInfo.socialMedia);

  return (
    <div className="flex justify-center gap-2">
      {socialMedia.map(({ name, color, path, url }: any) => (
        <SocialMediaButton key={name} color={color} path={path} url={url} />
      ))}
    </div>
  );
}
