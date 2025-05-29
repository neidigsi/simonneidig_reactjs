// Import external dependencies
import { JSX, useEffect } from "react";
import { useParams } from "react-router";

// Import internal dependencies
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPage, resetPage } from "@/store/slices/pageSlice";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";
import PageMain from "@/components/page/pageMain";
import "@/assets/css/main.css";

/**
 * Page Component
 *
 * This component is responsible for rendering dynamic content pages based on the URL parameter `:path`.
 * It loads the page content from the Redux store, fetches new content when the path or language changes,
 * and ensures the back button is enabled for navigation.
 *
 * Features:
 * - Loads and displays page content dynamically based on the `path` route parameter.
 * - Fetches content in the current language.
 * - Resets the page state and enables the back button when the path changes.
 * - Uses Redux Toolkit for state management and async actions.
 *
 * Usage:
 * - Used for routes like `/page/:path` (e.g., `/page/imprint`, `/page/privacy`).
 * - The content is fetched via the `loadPage` thunk and rendered using the `PageMain` component.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered Page component.
 */
export default function Page(): JSX.Element {
  // Get the dynamic path parameter from the route
  const { path } = useParams<{ path: string }>();

  // Select relevant state from Redux store
  const loaded = useAppSelector((state) => state.page.loaded);
  const title = useAppSelector((state) => state.page.title);
  const html = useAppSelector((state) => state.page.html);
  const language = useAppSelector((state) => state.settings.language);

  const dispatch = useAppDispatch();

  // Load page content if not already loaded and enable back button
  useEffect(() => {
    if (!loaded) {
      dispatch(loadPage({ language: language, path: path ?? "" }));
    }
    dispatch(setBackButtonEnabled(true));
  }, [loaded, dispatch, language, path]);

  // Reset page state and enable back button when path changes
  useEffect(() => {
    dispatch(resetPage());
    dispatch(setBackButtonEnabled(true));
  }, [path, dispatch]);

  // Render the page content
  return <PageMain title={title} text={html} loaded={loaded} />;
}
