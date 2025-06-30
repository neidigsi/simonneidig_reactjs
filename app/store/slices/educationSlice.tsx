// Import external dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import internal dependencies
import { http } from "@/networking/httpRequest";
import type { Institution } from "@/store/slices/experienceSlice";

export interface Education {
  id: number;
  degree: string;
  course_of_study: string;
  extract: string;
  description: string;
  start_date: string;
  end_date: string;
  university: Institution;
}

interface EducationState {
  loaded: boolean;
  educations: Education[];
}

const initialState: EducationState = {
  loaded: false,
  educations: [],
};

export const loadEducations = createAsyncThunk(
  "expertise/loadEucations",
  async ({ language }: { language: string }) => {
    const resp = await http({
      method: "GET",
      path: "/education/",
      language: language,
    });
    return resp.data;
  }
);

export const educationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEducations.fulfilled, (state, action) => {
        state.educations = [...action.payload].sort(
          (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
        state.loaded = true;
      })
      .addCase(loadEducations.pending, (state) => {
        state.loaded = false;
      })
      .addCase("i18n/changeLanguage", (state) => {
        state.educations = [];
        state.loaded = false;
      });
  },
});

export default educationSlice.reducer;
