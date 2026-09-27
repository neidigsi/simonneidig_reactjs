// Import internal dependencies
import { useAppSelector } from "@/store/hooks";

/**
 * ProfilePicture Component
 *
 * Displays the user's profile picture using the profilePictureId from the Redux store.
 * The image is styled with rounded corners and overlays a background for visual separation.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered profile picture component.
 */
export default function ProfilePicture() {
  const profilePictureId = useAppSelector(
    (state) => state.personalDetails.profilePictureId
  );
  return (
    <div className="flex justify-center">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/image/${profilePictureId}`}
        alt="User profile"
        className="liquid-avatar h-52 w-52 rounded-[24px] z-10 relative object-cover"
      />
    </div>
  );
}
