// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

interface Institution {
  name: string;
  description: string;
}

interface Education {
  degree: string;
  course_of_study: string;
  description: string;
  university: Institution;
}

interface EducationState {
  loaded: boolean;
  education: Education[];
}

const initialState: EducationState = {
  loaded: false,
  education: [],
};

export const educationSlice = createSlice({
  name: "education",
  initialState: initialState,
  reducers: {
    loadEducation: (state) => {
      let resp = [
        {
          degree: "M.Sc.",
          course_of_study: "Business Information Systems",
          description: "",
          university: {
            name: "Technical University of Darmstadt",
            description: "",
          },
        },
      ];

      state.education = resp;
      state.loaded = true;
    },
  },
});

export const { loadEducation } = educationSlice.actions;

export default educationSlice.reducer;
