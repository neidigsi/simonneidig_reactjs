// Import internal dependencies
import SocialMediaButton from "@/components/sidebar/socialMedia/socialMediaButton";
import { useAppSelector } from "@/store/hooks";

export default function SocialMedia() {
  const socialMedia = useAppSelector((state) => state.personalInfo.socialMedia);

  return (
    <div className="flex justify-center gap-2">
      {socialMedia != undefined &&
        socialMedia.map((item: any) => (
          <>
            <SocialMediaButton
              color={item.color}
              path={item.path}
              url={item.url}
            />
          </>
        ))}
    </div>
  );
}
