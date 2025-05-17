// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

export interface Experience {
  index: number;
  title: string;
  extract: string;
  description: string;
  industry: string;
  url: string;
  start_date: string;
  end_date: string;
  company: Institution;
}

export interface Address {
  street: string;
  streetnumber: number;
  zip: number;
  city: string;
  country: string;
}

export interface Institution {
  name: string;
  address: Address;
}

interface ExperienceState {
  loaded: boolean;
  experiences: Experience[];
}

const initialState: ExperienceState = {
  loaded: false,
  experiences: [],
};

export const loadExperiences = createAsyncThunk(
  "expertise/loadExperiences",
  async (
    { language }: { language: string },
    thunkAPI
  ) => {
    const resp = await http({
      method: "GET",
      path: "/experience",
      language: language,
    });
    return resp.data;
  }
);

export const experienceSlice = createSlice({
  name: "experience",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadExperiences.fulfilled, (state, action) => {
        state.experiences = action.payload;
        state.loaded = true;
      })
      .addCase(loadExperiences.pending, (state) => {
        state.loaded = false;
      })
      .addCase('i18n/changeLanguage', (state) => {
        state.experiences = [];
        state.loaded = false;
      });
  },
});

export default experienceSlice.reducer;
