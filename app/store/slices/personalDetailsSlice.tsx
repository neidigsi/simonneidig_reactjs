// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface PersonalDetailsState {
  loaded: boolean;
  name: string;
  position: string;
  abstract: string;
  profilePictureId: number | undefined;
}

const initialState: PersonalDetailsState = {
  loaded: false,
  name: "",
  position: "",
  abstract: "",
  profilePictureId: undefined,
};

export const loadPersonalDetails = createAsyncThunk(
  "expertise/loadPersonalDetails",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "GET",
      path: "/personal-details/",
      language: language,
    });
    return resp.data;
  }
);

export const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPersonalDetails.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.position = action.payload.position;
        state.abstract = action.payload.abstract;
        state.profilePictureId = action.payload.profile_picture_id;
        state.loaded = true;
      })
      .addCase(loadPersonalDetails.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        state.name = "";
        state.position = "";
        state.abstract = "";
        state.loaded = false;
      });
  },
});

export default personalDetailsSlice.reducer;
