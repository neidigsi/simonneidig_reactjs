// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadPersonalDetails } from "@/store/slices/personalDetailsSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

describe("personalDetailsSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      name: "",
      position: "",
      abstract: "",
      profilePictureId: undefined,
    });
  });

  it("loadPersonalDetails.pending sets loaded to false", () => {
    const next = reducer(
      {
        loaded: true,
        name: "Jane Doe",
        position: "Developer",
        abstract: "Abstract",
        profilePictureId: 7,
      },
      loadPersonalDetails.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadPersonalDetails.fulfilled stores the details", () => {
    const next = reducer(
      {
        loaded: false,
        name: "",
        position: "",
        abstract: "",
        profilePictureId: undefined,
      },
      loadPersonalDetails.fulfilled(
        {
          name: "Jane Doe",
          position: "Developer",
          abstract: "Short bio",
          profile_picture_id: 7,
        },
        "request-id",
        { language: "en" }
      )
    );
    expect(next).toEqual({
      loaded: true,
      name: "Jane Doe",
      position: "Developer",
      abstract: "Short bio",
      profilePictureId: 7,
    });
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = {
      loaded: true,
      name: "Jane Doe",
      position: "Developer",
      abstract: "Short bio",
      profilePictureId: 7,
    };
    const next = reducer(prev, { type: "i18n/changeLanguage" });
    expect(next).toEqual({
      loaded: false,
      name: "",
      position: "",
      abstract: "",
      profilePictureId: 7,
    });
  });

  it("loadPersonalDetails thunk fetches and updates the state", async () => {
    mockHttp.mockResolvedValue({
      data: {
        name: "Jane Doe",
        position: "Developer",
        abstract: "Short bio",
        profile_picture_id: 7,
      },
    });
    const store = configureStore({ reducer: { personalDetails: reducer } });

    await store.dispatch(loadPersonalDetails({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/personal-details/",
      language: "en",
    });
    expect(store.getState().personalDetails).toEqual({
      loaded: true,
      name: "Jane Doe",
      position: "Developer",
      abstract: "Short bio",
      profilePictureId: 7,
    });
  });
});
