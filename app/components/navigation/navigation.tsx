// Import external dependencies
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import { JSX } from "react";

// Import internal dependencies
import NavigationItem from "@/components/navigation/navigationItem";
import Icon from "@/components/general/icon";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

/**
 * Navigation component that renders a navigation bar with multiple navigation items.
 * The active navigation item is highlighted based on the current route.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 * 
 * @returns {JSX.Element} The rendered navigation component.
 */
export default function Navigation({
  navRef,
}: {
  readonly navRef: React.RefObject<HTMLDivElement | null>;
}): JSX.Element {
  const backButtonEnabled = useAppSelector(
    (state) => state.settings.backButtonEnabled
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <div
      ref={navRef}
      className="flex justify-between items-center sticky top-4 md:top-0 z-50 bg-inherit md:static md:z-auto"
    >
      <div className="flex justify-start">
        {backButtonEnabled && (
          <div className="bg-white dark:bg-dark-mode-background p-2 rounded-2xl drop-shadow-xl">
            <button
              id="navigation-back-button"
              type="button"
              aria-label={t("navigation.backButton")}
              className="nav-item"
              onClick={() => {
                dispatch(setBackButtonEnabled(false));
                navigate(-1);
              }}
            >
              <div className="grid justify-items-center gap-1">
                <div className="size-5">
                  <Icon icon="ArrowUturnLeftIcon" />
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <div className="grid grid-cols-4 gap-2 bg-white dark:bg-dark-mode-background p-2 rounded-2xl drop-shadow-xl">
          <NavigationItem
            text={t("navigation.headlines.home")}
            path="/"
            icon="UserIcon"
            active={location.pathname === "/"}
          />
          <NavigationItem
            text={t("navigation.headlines.resume")}
            path="/resume"
            icon="DocumentCheckIcon"
            active={location.pathname === "/resume"}
          />
          <NavigationItem
            text={t("navigation.headlines.works")}
            path="/works"
            icon="BriefcaseIcon"
            active={location.pathname === "/works"}
          />
          <NavigationItem
            text={t("navigation.headlines.contact")}
            path="/contact"
            icon="EnvelopeIcon"
            active={location.pathname === "/contact"}
          />
        </div>
      </div>
    </div>
  );
}
