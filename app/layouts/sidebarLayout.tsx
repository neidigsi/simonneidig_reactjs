
// Import external dependencies
import { useEffect, useRef } from "react";
import i18n from "i18next";
import { useLocation } from "react-router";

// Import internal dependencies
import Sidebar from "@/components/sidebar/sidebar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Navigation from "@/components/navigation/navigation";
import DarkModeToggl from "@/components/actionBar/darkModeToggl";
import LanguageSwitcher from "@/components/actionBar/languageSwitcher";
import { changeLanguage } from "@/store/slices/settingsSlice";
import { loadPersonalDetails } from "@/store/slices/personalDetailsSlice";
import { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import { loadSocialMedia } from "@/store/slices/socialMediaSlice";
import Loader from "@/components/general/loader/loader";

/**
 * SidebarLayout Component
 *
 * This layout component provides the main structure for pages with a sidebar and a main content area.
 * It handles loading of user-related data (personal details, info, social media) and displays a loader
 * until all required data is available. The layout is responsive and adapts to different screen sizes.
 *
 * Features:
 * - Loads personal details, info, and social media data from the store (with language support).
 * - Shows a loader until all data is loaded.
 * - Renders a sidebar and a main content area side by side (on larger screens).
 * - Includes language switcher and dark mode toggle in both sidebar and main content area, depending on screen size.
 * - Automatically scrolls to the navigation section on route change for small screens.
 *
 * Usage:
 * <SidebarLayout>
 *   <YourPageComponent />
 * </SidebarLayout>
 * 
 * @author Simon Neidig <mail@simon-neidig.eu>
 * @param {children} React.ReactNode - The main content to display in the layout.

 */
export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  /**
   * Reference to navigation section for scrolling
   */
  const navRef = useRef<HTMLDivElement>(null);

  /**
   * Current route location
   */
  const location = useLocation();

  /**
   * Store previous path for route change detection
   */
  const prevPathRef = useRef(location.pathname);

  /**
   * Check if personal details are loaded
   */
  const personalDetailsLoaded = useAppSelector(
    (state) => state.personalDetails.loaded
  );

  /**
   * Check if personal info is loaded
   */
  const personalInfoLoaded = useAppSelector(
    (state) => state.personalInfo.loaded
  );

  /**
   * Check if social media data is loaded
   */
  const socialMediaLoaded = useAppSelector((state) => state.socialMedia.loaded);

  useEffect(() => {
    // Load personal details if not already loaded
    if (!personalDetailsLoaded) {
      dispatch(loadPersonalDetails({ language: i18n.language }));
    }
    // Load personal info if not already loaded
    if (!personalInfoLoaded) {
      dispatch(loadPersonalInfo({ language: i18n.language }));
    }
    // Load social media data if not already loaded
    if (!socialMediaLoaded) {
      dispatch(loadSocialMedia({ language: i18n.language }));
    }
  });

  useEffect(() => {
    // Set the language in the Redux store on mount
    dispatch(changeLanguage(i18n.language));
  }, []);

  useEffect(() => {
    // Only scroll to navigation on small screens and if the route changed
    const mdBreakpoint =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--tw-breakpoint-md"
        )
      ) || 768;
    if (
      prevPathRef.current !== location.pathname && // Route has changed
      window.innerWidth < mdBreakpoint && // Only on small screens
      navRef.current // Navigation ref is available
    ) {
      navRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
    prevPathRef.current = location.pathname; // Update previous path
  }, [location.pathname]);

  return (
    <>
      {personalDetailsLoaded && personalInfoLoaded && socialMediaLoaded ? (
        // Main layout grid, only rendered when all data is loaded
        <div className="max-w-[1350px] w-screen">
          <div className="mx-8 grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-8 xl:grid-cols-7">
            {/* Sidebar section */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 xl:col-span-2">
              {/* Action bar for small screens */}
              <div className="md:hidden flex justify-end button-bar">
                <LanguageSwitcher />
                <DarkModeToggl />
              </div>
              <Sidebar />
            </div>
            {/* Main content section */}
            <div className="col-span-1 md:col-span-1 lg:col-span-5 xl:col-span-5">
              {/* Action bar for medium and larger screens */}
              <div className="hidden md:flex justify-end button-bar">
                <LanguageSwitcher />
                <DarkModeToggl />
              </div>
              <div className="main-section">
                <Navigation navRef={navRef} />
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Loader shown while data is loading
        <div className="grid h-screen w-screen">
          <Loader size={5} color="white" />
        </div>
      )}
    </>
  );
}
