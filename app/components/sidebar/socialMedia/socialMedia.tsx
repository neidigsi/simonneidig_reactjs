// Import external dependencies
import { useEffect } from "react";

// Import internal dependencies
import SocialMediaButton from "@/components/sidebar/socialMedia/socialMediaButton";
import { loadSocialMedia } from "@/store/slices/socialMediaSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

export default function SocialMedia() {
  const socialMedia = useAppSelector((state) => state.socialMedia.socialMedia);
  const loaded = useAppSelector((state) => state.socialMedia.loaded);
  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(loadSocialMedia({ language: language }));
    }
  });

  return (
    <div className="flex justify-center gap-2">
      {socialMedia.map(({ name, color, path, url }: any) => (
        <SocialMediaButton key={name} color={color} path={path} url={url} />
      ))}
    </div>
  );
}
