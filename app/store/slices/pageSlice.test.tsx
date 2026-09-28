// Import external dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import internal dependencies
import reducer, { loadPage, resetPage } from "@/store/slices/pageSlice";
import { http } from "@/networking/httpRequest";

jest.mock("@/networking/httpRequest", () => ({
  http: jest.fn(),
}));

const mockHttp = http as jest.Mock;

describe("pageSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({
      loaded: false,
      title: "",
      html: "",
    });
  });

  it("resetPage clears title, html and loaded flag", () => {
    const prev = { loaded: true, title: "Title", html: "<p>html</p>" };
    expect(reducer(prev, resetPage())).toEqual({
      loaded: false,
      title: "",
      html: "",
    });
  });

  it("loadPage.pending sets loaded to false", () => {
    const prev = { loaded: true, title: "Title", html: "<p>html</p>" };
    const next = reducer(
      prev,
      loadPage.pending("request-id", { language: "en", path: "imprint" })
    );
    expect(next.loaded).toBe(false);
  });

  it("loadPage.fulfilled stores title and html", () => {
    const next = reducer(
      { loaded: false, title: "", html: "" },
      loadPage.fulfilled(
        { title: "Imprint", html: "<p>content</p>" },
        "request-id",
        { language: "en", path: "imprint" }
      )
    );
    expect(next).toEqual({
      loaded: true,
      title: "Imprint",
      html: "<p>content</p>",
    });
  });

  it("resets state on i18n/changeLanguage", () => {
    const prev = { loaded: true, title: "Title", html: "<p>html</p>" };
    expect(reducer(prev, { type: "i18n/changeLanguage" })).toEqual({
      loaded: false,
      title: "",
      html: "",
    });
  });

  it("loadPage thunk fetches the page and updates the state", async () => {
    mockHttp.mockResolvedValue({
      data: { title: "Imprint", html: "<p>content</p>" },
    });
    const store = configureStore({ reducer: { page: reducer } });

    await store.dispatch(loadPage({ language: "en", path: "imprint" }));

    expect(mockHttp).toHaveBeenCalledWith({
      method: "GET",
      path: "/page/imprint",
      language: "en",
    });
    expect(store.getState().page).toEqual({
      loaded: true,
      title: "Imprint",
      html: "<p>content</p>",
    });
  });
});
