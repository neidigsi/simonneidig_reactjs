// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

interface Information {
  label: string;
  value: string;
  icon: string;
}

interface PersonalInfoState {
  loaded: boolean;
  information: Information[];
}

const initialState: PersonalInfoState = {
  loaded: false,
  information: [],
};

export const loadPersonalInfo = createAsyncThunk(
  "expertise/loadPersonalInfo",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "GET",
      path: "/personal-information",
      language: language,
    });
    return resp.data;
  }
);

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPersonalInfo.fulfilled, (state, action) => {
        state.information = action.payload;
        state.loaded = true;
      })
      .addCase(loadPersonalInfo.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        state.information = [];
        state.loaded = false;
      });
  },
});

export default personalInfoSlice.reducer;
