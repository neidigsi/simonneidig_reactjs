// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadPersonalInfo } from "@/store/slices/personalInfoSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

describe("personalInfoSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      information: [],
    });
  });

  it("loadPersonalInfo.pending sets loaded to false", () => {
    const next = reducer(
      {
        loaded: true,
        information: [{ label: "Email", value: "a@b.c", icon: "mail" }],
      },
      loadPersonalInfo.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadPersonalInfo.fulfilled stores the information", () => {
    const information = [
      { label: "Email", value: "jane@example.com", icon: "mail" },
      { label: "Phone", value: "+123", icon: "phone" },
    ];
    const next = reducer(
      { loaded: false, information: [] },
      loadPersonalInfo.fulfilled(information, "request-id", {
        language: "en",
      })
    );
    expect(next).toEqual({ loaded: true, information });
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = {
      loaded: true,
      information: [{ label: "Email", value: "a@b.c", icon: "mail" }],
    };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      information: [],
    });
  });

  it("loadPersonalInfo thunk fetches and updates the state", async () => {
    const information = [
      { label: "Email", value: "jane@example.com", icon: "mail" },
    ];
    mockHttp.mockResolvedValue({ data: information });
    const store = configureStore({ reducer: { personalInfo: reducer } });

    await store.dispatch(loadPersonalInfo({ language: "de" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/personal-information/",
      language: "de",
    });
    expect(store.getState().personalInfo).toEqual({
      loaded: true,
      information,
    });
  });
});
