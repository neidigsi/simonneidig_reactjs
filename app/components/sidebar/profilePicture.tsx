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
    <div className="flex justify-center relative">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/image/${profilePictureId}`}
        alt="User profile"
        className="h-52 w-52 rounded-2xl z-10 object-cover"
      />
      <div className="bg-white dark:bg-dark-mode-background h-24 w-full rounded-t-2xl z-0 absolute bottom-0"></div>
    </div>
  );
}
