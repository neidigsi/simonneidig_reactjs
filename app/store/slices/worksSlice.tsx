// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

export interface Portfolio {
  index: number;
  color: string;
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
          thumbnail: "/images/mvm1914.png",
        },
        {
          index: 2,
          title: "Personal Website",
          url: "https://simon-neidig.de",
          categories: ["Web Development", "UI/UX", "Operations"],
          thumbnail: "/images/personalWebsite.png",
        },
      ];

       // Assign color to element
       let j = 0;
       for (let i = 0; i < resp.length; i++) {
         j += 1;
 
         if (j < 2) {
           resp[i] = { ...resp[i], index: i, color: "secondary" };
         } else {
           j = j % 3;
           resp[i] = { ...resp[i], index: i, color: "primary" };
         }
       }

      state.portfolio = resp;
      state.categories = Array.from(
        new Set(resp.flatMap((item) => item.categories))
      );
      state.categories.push("All");
      state.categories.sort((a, b) => a.localeCompare(b))
      state.loaded = true;
    },
  },
});

export const { loadWorks } = worksSlice.actions;

export default worksSlice.reducer;
