// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadEducations } from "@/store/slices/educationSlice";
import type { Education } from "@/store/slices/educationSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

const institution = {
  name: "University",
  address: {
    street: "Main Street",
    streetnumber: 1,
    zip: 12345,
    city: "Springfield",
    country: "Germany",
  },
};

const educations: Education[] = [
  {
    id: 1,
    degree: "B.Sc.",
    course_of_study: "Computer Science",
    extract: "Old",
    description: "Older studies",
    start_date: "2018-10-01",
    end_date: "2021-09-30",
    university: institution,
  },
  {
    id: 2,
    degree: "M.Sc.",
    course_of_study: "Computer Science",
    extract: "New",
    description: "Recent studies",
    start_date: "2021-10-01",
    end_date: "2023-09-30",
    university: institution,
  },
];

describe("educationSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      educations: [],
    });
  });

  it("loadEducations.pending sets loaded to false", () => {
    const next = reducer(
      { loaded: true, educations },
      loadEducations.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadEducations.fulfilled stores educations sorted by start date descending", () => {
    const next = reducer(
      { loaded: false, educations: [] },
      loadEducations.fulfilled([...educations], "request-id", {
        language: "en",
      })
    );
    expect(next.loaded).toBe(true);
    expect(next.educations.map((item) => item.id)).toEqual([2, 1]);
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = { loaded: true, educations };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      educations: [],
    });
  });

  it("loadEducations thunk fetches and updates the state", async () => {
    mockHttp.mockResolvedValue({ data: [...educations] });
    const store = configureStore({ reducer: { education: reducer } });

    await store.dispatch(loadEducations({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/education/",
      language: "en",
    });
    const state = store.getState().education;
    expect(state.loaded).toBe(true);
    expect(state.educations.map((item) => item.id)).toEqual([2, 1]);
  });
});
