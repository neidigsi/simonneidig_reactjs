// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadExpertises } from "@/store/slices/expertiseSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

const expertises = [
  { id: 2, color: "", title: "B", description: "d", icon: "i", sort: 2 },
  { id: 1, color: "", title: "A", description: "d", icon: "i", sort: 1 },
  { id: 3, color: "", title: "C", description: "d", icon: "i", sort: 3 },
];

describe("expertiseSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      expertises: [],
    });
  });

  it("loadExpertises.pending sets loaded to false", () => {
    const next = reducer(
      { loaded: true, expertises: [] },
      loadExpertises.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadExpertises.fulfilled stores the expertises", () => {
    const next = reducer(
      { loaded: false, expertises: [] },
      loadExpertises.fulfilled([...expertises], "request-id", {
        language: "en",
      })
    );
    expect(next.loaded).toBe(true);
    expect(next.expertises).toEqual(expertises);
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = { loaded: true, expertises };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      expertises: [],
    });
  });

  it("loadExpertises thunk sorts by sort field and assigns colors", async () => {
    mockHttp.mockResolvedValue({
      data: expertises.map((item) => ({ ...item })),
    });
    const store = configureStore({ reducer: { expertise: reducer } });

    await store.dispatch(loadExpertises({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/expertise/",
      language: "en",
    });
    const state = store.getState().expertise;
    expect(state.loaded).toBe(true);
    expect(state.expertises.map((item) => item.id)).toEqual([1, 2, 3]);
    expect(state.expertises.map((item) => item.color)).toEqual([
      "secondary",
      "primary",
      "primary",
    ]);
  });
});
