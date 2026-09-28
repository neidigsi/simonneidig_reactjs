// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadSocialMedia } from "@/store/slices/socialMediaSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

describe("socialMediaSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      socialMedia: [],
    });
  });

  it("loadSocialMedia.pending sets loaded to false", () => {
    const next = reducer(
      {
        loaded: true,
        socialMedia: [
          { name: "GitHub", url: "https://github.com", color: "dark", path: "M0" },
        ],
      },
      loadSocialMedia.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadSocialMedia.fulfilled stores the entries", () => {
    const socialMedia = [
      { name: "GitHub", url: "https://github.com", color: "dark", path: "M0" },
      { name: "LinkedIn", url: "https://linkedin.com", color: "blue", path: "M1" },
    ];
    const next = reducer(
      { loaded: false, socialMedia: [] },
      loadSocialMedia.fulfilled(socialMedia, "request-id", { language: "en" })
    );
    expect(next).toEqual({ loaded: true, socialMedia });
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = {
      loaded: true,
      socialMedia: [
        { name: "GitHub", url: "https://github.com", color: "dark", path: "M0" },
      ],
    };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      socialMedia: [],
    });
  });

  it("loadSocialMedia thunk fetches and updates the state", async () => {
    const socialMedia = [
      { name: "GitHub", url: "https://github.com", color: "dark", path: "M0" },
    ];
    mockHttp.mockResolvedValue({ data: socialMedia });
    const store = configureStore({ reducer: { socialMedia: reducer } });

    await store.dispatch(loadSocialMedia({ language: "fr" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/social-media/",
      language: "fr",
    });
    expect(store.getState().socialMedia).toEqual({
      loaded: true,
      socialMedia,
    });
  });
});
