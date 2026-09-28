// Import external dependencies
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import ProfilePicture from "@/components/sidebar/profilePicture";
import personalDetailsReducer from "@/store/slices/personalDetailsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

function makeStore(profilePictureId: number | undefined) {
  return configureStore({
    reducer: { personalDetails: personalDetailsReducer },
    preloadedState: {
      personalDetails: {
        loaded: true,
        name: "Test",
        position: "Dev",
        abstract: "",
        profilePictureId,
      },
    },
  });
}

describe("ProfilePicture Component", () => {
  /**
   * Test to check if the profile picture renders with the backend URL and picture id.
   */
  it("renders image with backend url containing picture id", () => {
    const store = makeStore(42);
    render(
      <Provider store={store}>
        <ProfilePicture />
      </Provider>
    );

    const img = screen.getByAltText("User profile");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      `${process.env.VITE_BACKEND_URL}/image/42`
    );
    expect(img).toHaveClass("liquid-avatar");
  });

  /**
   * Test to check if avatar styling classes are applied.
   */
  it("applies avatar styling classes", () => {
    const store = makeStore(7);
    render(
      <Provider store={store}>
        <ProfilePicture />
      </Provider>
    );

    const img = screen.getByAltText("User profile");
    expect(img).toHaveClass("liquid-avatar");
    expect(img).toHaveClass("object-cover");
  });

  /**
   * Test to check if a different picture id from the store is reflected in the src.
   */
  it("reflects picture id updates from the store", () => {
    const store = makeStore(1);
    const { rerender } = render(
      <Provider store={store}>
        <ProfilePicture />
      </Provider>
    );

    expect(screen.getByAltText("User profile")).toHaveAttribute(
      "src",
      expect.stringContaining("/image/1")
    );

    // Re-create store with another id to simulate an update
    const updatedStore = makeStore(99);
    rerender(
      <Provider store={updatedStore}>
        <ProfilePicture />
      </Provider>
    );

    expect(screen.getByAltText("User profile")).toHaveAttribute(
      "src",
      expect.stringContaining("/image/99")
    );
  });
});
