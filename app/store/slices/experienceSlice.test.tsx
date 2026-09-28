// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadExperiences } from "@/store/slices/experienceSlice";
import type { Experience } from "@/store/slices/experienceSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

const company = {
  name: "Company",
  address: {
    street: "Main Street",
    streetnumber: 1,
    zip: 12345,
    city: "Springfield",
    country: "Germany",
  },
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Junior Developer",
    extract: "Old role",
    description: "Earlier position",
    industry: "IT",
    url: "https://old.example.com",
    start_date: "2019-01-01",
    end_date: "2021-12-31",
    company,
  },
  {
    id: 2,
    title: "Senior Developer",
    extract: "New role",
    description: "Current position",
    industry: "IT",
    url: "https://new.example.com",
    start_date: "2022-01-01",
    end_date: "2024-12-31",
    company,
  },
];

describe("experienceSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      experiences: [],
    });
  });

  it("loadExperiences.pending sets loaded to false", () => {
    const next = reducer(
      { loaded: true, experiences },
      loadExperiences.pending("request-id", { language: "en" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadExperiences.fulfilled stores experiences sorted by start date descending", () => {
    const next = reducer(
      { loaded: false, experiences: [] },
      loadExperiences.fulfilled([...experiences], "request-id", {
        language: "en",
      })
    );
    expect(next.loaded).toBe(true);
    expect(next.experiences.map((item) => item.id)).toEqual([2, 1]);
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = { loaded: true, experiences };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      experiences: [],
    });
  });

  it("loadExperiences thunk fetches and updates the state", async () => {
    mockHttp.mockResolvedValue({ data: [...experiences] });
    const store = configureStore({ reducer: { experience: reducer } });

    await store.dispatch(loadExperiences({ language: "en" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/experience/",
      language: "en",
    });
    const state = store.getState().experience;
    expect(state.loaded).toBe(true);
    expect(state.experiences.map((item) => item.id)).toEqual([2, 1]);
  });
});
