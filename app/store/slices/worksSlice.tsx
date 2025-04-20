// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

export interface Portfolio {
  index: number;
  title: string;
  url: string;
  categories: string[];
  thumbnail: string;
}

interface WorksState {
  loaded: boolean;
  portfolio: Portfolio[];
  categories: string[];
}

const initialState: WorksState = {
  loaded: false,
  portfolio: [],
  categories: [],
};

export const worksSlice = createSlice({
  name: "works",
  initialState: initialState,
  reducers: {
    loadWorks: (state) => {
      let resp = [
        {
          index: 1,
          title: "Musikverein 1914 Münster e. V.",
          url: "https://mvm1914.de",
          categories: ["WordPress", "Operations"],
          thumbnail: "",
        },
        {
          index: 2,
          title: "Personal Website",
          url: "https://simon-neidig.de",
          categories: ["Web Development", "UI/UX", "Operations"],
          thumbnail: "",
        },
      ];

      state.portfolio = resp;
      state.categories = Array.from(
        new Set(resp.flatMap((item) => item.categories))
      ).sort((a, b) => a.localeCompare(b));
      state.loaded = true;
    },
  },
});

export const { loadWorks } = worksSlice.actions;

export default worksSlice.reducer;
