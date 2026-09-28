// Import internal dependencies
import { makeStore } from "@/store/store";
import { setName } from "@/store/slices/contactSlice";
import { setBackButtonEnabled } from "@/store/slices/settingsSlice";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const expectedReducerKeys = [
  "contact",
  "education",
  "experience",
  "expertise",
  "page",
  "personalDetails",
  "personalInfo",
  "settings",
  "socialMedia",
  "user",
  "works",
];

describe("makeStore", () => {
  it("registers all slice reducers with their initial states", () => {
    const state = makeStore().getState();

    expect(Object.keys(state).sort()).toEqual([...expectedReducerKeys].sort());
    expect(state.settings.language).toBe("en");
    expect(state.page).toEqual({ loaded: false, title: "", html: "" });
    expect(state.contact.name).toBe("");
    expect(state.user.loggedIn).toBe(false);
    expect(state.works.currentFilter).toBe("All");
    expect(state.education.educations).toEqual([]);
    expect(state.experience.experiences).toEqual([]);
    expect(state.expertise.expertises).toEqual([]);
    expect(state.personalInfo.information).toEqual([]);
    expect(state.personalDetails.name).toBe("");
    expect(state.socialMedia.socialMedia).toEqual([]);
  });

  it("creates independent store instances", () => {
    const first = makeStore();
    const second = makeStore();

    first.dispatch(setBackButtonEnabled(true));

    expect(first.getState().settings.backButtonEnabled).toBe(true);
    expect(second.getState().settings.backButtonEnabled).toBe(false);
  });

  it("updates state across slices", () => {
    const store = makeStore();

    store.dispatch(setName("Jane"));
    store.dispatch(setBackButtonEnabled(true));

    expect(store.getState().contact.name).toBe("Jane");
    expect(store.getState().settings.backButtonEnabled).toBe(true);
  });
});
