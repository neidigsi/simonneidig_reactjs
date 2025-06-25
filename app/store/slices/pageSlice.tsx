// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface PageState {
  loaded: boolean;
  title: string;
  html: string;
}

const initialState: PageState = {
  loaded: false,
  title: "",
  html: "",
};

export const loadPage = createAsyncThunk(
  "expertise/loadPage",
  async ({ language, path }: { language: string; path: string }) => {
    const resp = await http({
      method: "GET",
      path: "/page/" + path + "/",
      language: language,
    });
    return resp.data;
  }
);

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.loaded = false;
      state.title = "";
      state.html = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPage.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.html = action.payload.html;
        state.loaded = true;
      })
      .addCase(loadPage.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        state.title = "";
        state.html = "";
        state.loaded = false;
      });
  },
});

export const { resetPage } = pageSlice.actions;
export default pageSlice.reducer;
