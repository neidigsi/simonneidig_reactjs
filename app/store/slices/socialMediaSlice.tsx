// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface SocialMedia {
  name: string;
  url: string;
  color: string;
  path: string;
}

interface SocialMediaState {
  loaded: boolean;
  socialMedia: SocialMedia[];
}

const initialState: SocialMediaState = {
  loaded: false,
  socialMedia: [],
};

export const loadSocialMedia = createAsyncThunk(
  "expertise/loadSocialMedia",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "GET",
      path: "/social-media/",
      language: language,
    });
    return resp.data;
  }
);

export const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSocialMedia.fulfilled, (state, action) => {
        state.socialMedia = action.payload;
        state.loaded = true;
      })
      .addCase(loadSocialMedia.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        state.socialMedia = [];
        state.loaded = false;
      });
  },
});

export default socialMediaSlice.reducer;
